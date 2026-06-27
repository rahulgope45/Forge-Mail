import { Queue } from "bullmq";
import { redisConnection } from "../config/bullMQ.js";

export const mailQueue = new Queue ("send-mail",{
    connection: redisConnection
})