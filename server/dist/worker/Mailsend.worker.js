import { Worker, Job } from "bullmq";
import { prisma } from "../lib/prisma.js";
import { sendEmailWithGmail } from "../services/gmailSend.service.js";
import { redisConnection } from "../config/bullMQ.js";
const processMailSendJob = async (job) => {
    const { mailJobId } = job.data;
    const mailJob = await prisma.mailJob.findUnique({
        where: { id: mailJobId },
    });
    if (!mailJob) {
        // row doesn't exist -- nothing sensible to retry, just stop here
        console.error(`MailJob ${mailJobId} not found in DB, skipping.`);
        return;
    }
    // idempotency safety net -- if this job got redelivered (e.g. worker
    // crashed after sending but before BullMQ marked it complete), don't
    // send the same mail twice
    if (mailJob.status === "SENT") {
        console.log(`MailJob ${mailJobId} already SENT, skipping redelivery.`);
        return;
    }
    const user = await prisma.user.findUnique({
        where: { id: mailJob.userId },
        select: { googleRefreshToken: true },
    });
    if (!user?.googleRefreshToken) {
        await prisma.mailJob.update({
            where: { id: mailJobId },
            data: {
                status: "FAILED_PERMANENT",
                errorReason: "Gmail not connected",
            },
        });
        // no rethrow -- BullMQ will mark this job "completed", which is
        // correct here since retrying can never fix a missing token
        return;
    }
    try {
        const result = await sendEmailWithGmail(user.googleRefreshToken, mailJob.to, mailJob.subject, mailJob.body);
        await prisma.mailJob.update({
            where: { id: mailJobId },
            data: {
                status: "SENT",
                messageId: result.data.id ?? null,
                sentAt: new Date(),
            },
        });
    }
    catch (err) {
        const errorMessage = err?.message ?? "Unknown error";
        const isRetryable = errorMessage.includes("auth failed") ||
            errorMessage.includes("rate limit");
        await prisma.mailJob.update({
            where: { id: mailJobId },
            data: {
                status: isRetryable ? "FAILED_RETRYABLE" : "FAILED_PERMANENT",
                errorReason: errorMessage,
            },
        });
        if (isRetryable) {
            // rethrow -- BullMQ catches this and applies attempts/backoff
            throw err;
        }
        // permanent failure -- swallow, do not rethrow, job is "done"
        // (done in the sense that BullMQ should stop touching it)
    }
};
export const mailSendWorker = new Worker("send-mail", processMailSendJob, {
    connection: redisConnection,
    concurrency: 5,
    limiter: {
        max: 10,
        duration: 1000,
    },
});
mailSendWorker.on("completed", (job) => {
    console.log(`Mail job ${job.id} processed (check MailJob.status in DB for outcome)`);
});
mailSendWorker.on("failed", (job, err) => {
    console.error(`Mail job ${job?.id} failed and will retry per backoff: ${err.message}`);
});
console.log("Mail Send Worker started, listening for jobs...");
//# sourceMappingURL=Mailsend.worker.js.map