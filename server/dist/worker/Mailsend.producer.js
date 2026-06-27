import { prisma } from "../lib/prisma.js";
import { mailQueue } from "../queues/mailSend.queue.js";
export const createMailJob = async ({ userId, to, subject, body, sendAt }) => {
    const recipient = Array.isArray(to) ? to : [to];
    if (recipient.length === 0) {
        throw new Error("At least one recipient is required");
    }
    ;
    const scheduledFor = sendAt ? new Date(sendAt) : new Date();
    if (sendAt && Number.isNaN(scheduledFor.getTime())) {
        throw new Error(`Invalid sendAt value: ${sendAt}`);
    }
    const delay = sendAt ? Math.max(scheduledFor.getTime() - Date.now(), 0) : 0;
    const mailJob = await Promise.all(recipient.map((recipient) => prisma.mailJob.create({
        data: {
            userId,
            to: recipient,
            subject,
            body,
            scheduledFor,
            status: "PENDING"
        }
    })));
    await mailQueue.addBulk(mailJob.map((mailJob) => ({
        name: "send-mail",
        data: {
            mailJobId: mailJob.id
        },
        opts: {
            jobId: mailJob.id,
            delay,
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 5000
            }
        }
    })));
    return {
        jobIds: mailJob.map((j) => j.id)
    };
};
console.log('Mail Worker Started');
//# sourceMappingURL=Mailsend.producer.js.map