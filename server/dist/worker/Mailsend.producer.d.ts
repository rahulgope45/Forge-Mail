interface CreateMailJobParams {
    userId: string;
    to: string | string[];
    subject: string;
    body: string;
    sendAt?: string;
}
interface CreateMailJobResult {
    jobIds: string[];
}
export declare const createMailJob: ({ userId, to, subject, body, sendAt }: CreateMailJobParams) => Promise<CreateMailJobResult>;
export {};
//# sourceMappingURL=Mailsend.producer.d.ts.map