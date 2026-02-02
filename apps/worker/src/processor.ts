import { Worker } from 'bullmq';
import { connection } from '@opsflow/queue';

export const worker = new Worker(
    'jobs',
    async (job) => {
        console.log("processing job", job.data);

        return { ok: true };
    },
    { connection }
)