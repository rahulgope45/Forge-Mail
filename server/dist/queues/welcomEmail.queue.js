import { Queue } from "bullmq";
import { redisConnection } from "../config/bullMQ.js";
export const emailQueue = new Queue('welcomeQueue', {
    connection: redisConnection
});
//# sourceMappingURL=welcomEmail.queue.js.map