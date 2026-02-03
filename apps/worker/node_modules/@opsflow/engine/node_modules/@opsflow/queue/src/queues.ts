import { Queue } from 'bullmq';
import { connection } from './connection';

export const jobQueue = new Queue('jobs', { connection });