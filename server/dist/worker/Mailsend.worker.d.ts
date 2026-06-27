import { Worker } from "bullmq";
interface MailSendJobData {
    mailJobId: string;
}
export declare const mailSendWorker: Worker<MailSendJobData, any, string>;
export {};
//# sourceMappingURL=Mailsend.worker.d.ts.map