import { Worker } from 'bullmq';
import { connection, jobQueue } from '@opsflow/queue';
import { prisma } from '@opsflow/db';
import axios from "axios";


export const worker = new Worker(
    'jobs',
    async (job) => {
        const { executionId, stepIndex, workflow } = job.data;
        const step = workflow.steps[stepIndex];
        console.log("Running step:", stepIndex, " ", step.key, "with id: ", executionId);

        const nextIndex = stepIndex + 1;

        try {
            let result: any;
            //step handles
            if (step.type == 'http') {
                const res = await axios(step.config.url);
                result = res.data;
            }
            if (step.type === "script") {
                const fn = new Function("input", step.config.code);
                result = await fn({});
            }

            console.log("Step success");

            //TODO later : enqueue next step

            await prisma.job.create({
                data: {
                    executionId,
                    stepkey: step.key,
                    status: "ACTIVE",
                    output: result,
                    attempts: job.attemptsMade + 1
                }
            })



            // more steps? enqueue next
            if (nextIndex < workflow.steps.length) {
                await jobQueue.add("job", {
                    executionId,
                    stepIndex: nextIndex,
                    workflow
                });
            } else {
                // finished workflow
                await prisma.execution.update({
                    where: { id: executionId },
                    data: {
                        status: "SUCCESS",
                        finishedAt: new Date()
                    }
                });

                console.log("Workflow completed");
            }

            return result;

        } catch (err: any) {
            console.error("Step failed:", err.message);
            await prisma.job.create({
                data: {
                    executionId,
                    stepkey: step.key,
                    status: job.attemptsMade + 1 >= 3 ? "FAILED" : "RETRYING",
                    error: err.message,
                    attempts: job.attemptsMade + 1
                }
            })
            throw err;
        }
    },
    { connection }
)