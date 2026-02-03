import { prisma } from '@opsflow/db';
import { jobQueue } from "@opsflow/queue";
import { WorkflowDefinition } from "./types";


export async function runWorkflow(def: WorkflowDefinition) {

    //create workflow record

    const workflow = await prisma.workflow.create({
        data: {
            name: def.name,
            definition: def as any
        }
    })

    // 2. create execution
    const execution = await prisma.execution.create({
        data: {
            workflowId: workflow.id,
            status: "RUNNING",
            startedAt: new Date()
        }
    });

    // 3. enqueue first step only 
    const firstStep = def.steps[0];


    await jobQueue.add("job", {
        executionId: execution.id,
        stepIndex: 0,
        step: firstStep
    });

    console.log("Execution queued:", execution.id);

    return execution.id;
}