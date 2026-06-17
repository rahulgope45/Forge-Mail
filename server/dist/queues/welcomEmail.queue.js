import { Queue } from "bullmq";
import { redisConnection } from "../config/bullMQ.js";
export const emailQueue = new Queue('welcome-Queue', {
    connection: redisConnection
});
//# sourceMappingURL=welcomEmail.queue.js.map