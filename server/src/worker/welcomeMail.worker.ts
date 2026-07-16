import { Worker } from "bullmq";
import { redisConnection } from "../config/bullMQ.js";
import { emailQueue } from "../queues/welcomEmail.queue.js";
import { sendWelcomeMail } from "../services/mail.service.js";

const worker = new Worker(
    'welcome-Queue',
    async (job) => {
        console.log('Processing Job', job.id);
        console.log('Data', job.data);
        console.log(`Attempt: ${job.attemptsMade + 1}`)

        await new Promise((resolve) =>
            setTimeout(resolve, 3000)
        );

        await sendWelcomeMail(
            job.data.to,
            job.data.name,
        )

        return {
            success: true
        }
    },
    {
        connection : redisConnection
    }
)


worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed `, new Date().toLocaleTimeString())
});

worker.on("failed", (job, err) => {
    console.log(`Job ${job?.id} failed: ${err.message}`);
})

console.log('Welcome Mail Wokrker Started');

export default worker;