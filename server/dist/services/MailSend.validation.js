const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const Max_Recipients = 100;
// export const validateMailSendRequest = (
//     payload: Partial<MailSendRequestBody>
// ): ValidationResult => {
//     const { to, subject, body, sendAt } = payload;
//     if (!subject || typeof subject !== "string" || subject.trim() === "") {
//         return { valid: false, error: "subject is required" };
//     }
//     if (!body || typeof body !== "string" || body.trim() === "") {
//         return { valid: false, error: "body is required" };
//     }
//     if (to === undefined || to === null) {
//         return { valid: false, error: "to is required" };
//     }
//     const recipients = Array.isArray ? to : [to]
// }
//# sourceMappingURL=MailSend.validation.js.map