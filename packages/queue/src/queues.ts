import { Queue } from 'bullmq';
import { connection } from './connection';

export const jobQueue = new Queue('jobs', {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 2000
        },
        removeOnComplete: false,
        removeOnFail: false
    }
});

