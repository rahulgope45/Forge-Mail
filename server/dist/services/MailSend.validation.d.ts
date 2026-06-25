export declare const Max_Recipients = 100;
export interface MailSendRequestBody {
    to: string | string[];
    subject: string;
    body: string;
    sendAt?: string;
}
export interface ValidationResult {
    valid: boolean;
    error?: string;
}
//# sourceMappingURL=MailSend.validation.d.ts.map