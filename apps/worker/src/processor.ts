import { Worker } from 'bullmq';
import { connection } from '@opsflow/queue';
import { prisma } from '@opsflow/db';
import axios from "axios";


export const worker = new Worker(
    'jobs',
    async (job) => {
        const { executionId, stepIndex, step } = job.data;
        console.log("Running step:", step.key, "with id: ", executionId);

        let result: any;

        try {
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

            return result;

        } catch (err: any) {
            console.error("Step failed:", err.message);
            throw err;
        }
    },
    { connection }
)