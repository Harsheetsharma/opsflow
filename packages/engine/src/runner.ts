import { prisma } from '@opsflow/db';
import { jobQueue } from "@opsflow/queue";
import { WorkflowDefinition } from "./types";

export type RunWorkflowResult = {
    executionId: string;
    duplicate: boolean;
    status: string;
    result: any | null;
};

export async function runWorkflow(def: WorkflowDefinition): Promise<RunWorkflowResult> {
    const idempotencyKey = def.idempotencyKey;

    const findExistingWorkflow = async () => {
        if (!idempotencyKey) return null;

        return prisma.workflow.findUnique({
            where: { idempotencyKey },
            include: {
                executions: {
                    orderBy: { startedAt: 'desc' },
                    take: 1
                }
            }
        });
    };

    const existing = await findExistingWorkflow();
    if (existing && existing.executions.length > 0) {
        const existingExecution = existing.executions[0];
        return {
            executionId: existingExecution.id,
            duplicate: true,
            status: existingExecution.status,
            result: existingExecution.result ?? null
        };
    }

    let workflow;
    try {
        workflow = await prisma.workflow.create({
            data: {
                name: def.name,
                definition: def as any,
                idempotencyKey
            }
        });
    } catch (error: any) {
        if (error.code === 'P2002') {
            workflow = await findExistingWorkflow();
        } else {
            throw error;
        }
    }

    if (!workflow) {
        throw new Error('Failed to create or find workflow for idempotency key');
    }

    const execution = await prisma.execution.create({
        data: {
            workflowId: workflow.id,
            status: "RUNNING",
            startedAt: new Date()
        }
    });

    await jobQueue.add("job", {
        executionId: execution.id,
        stepIndex: 0,
        workflow: def
    });

    console.log("Execution queued:", execution.id);

    return {
        executionId: execution.id,
        duplicate: false,
        status: execution.status,
        result: null
    };
}