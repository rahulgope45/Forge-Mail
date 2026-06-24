import { getGmailClient } from "./gmail.service.js";
export const sendEmailWithGmail = async (googleRefreshToken, to, subject, body) => {
    if (!to || !subject || !body) {
        throw new Error("Missing required email fields: to, subject, or body");
    }
    // strip newlines/CR to prevent header injection via crafted input
    const safeTo = to.replace(/[\r\n]/g, "");
    const safeSubject = subject.replace(/[\r\n]/g, "");
    const gmail = await getGmailClient(googleRefreshToken);
    const message = [
        `To: ${safeTo}`,
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=utf-8",
        `Subject: ${safeSubject}`,
        "",
        body,
    ].join("\n");
    const encodedMessage = Buffer
        .from(message)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    try {
        const result = await gmail.users.messages.send({
            userId: "me",
            requestBody: {
                raw: encodedMessage,
            },
        });
        return result;
    }
    catch (err) {
        // surface a clean error so the BullMQ worker can decide retry vs fail
        const status = err?.response?.status;
        const message = err?.response?.data?.error?.message || err.message;
        if (status === 401 || status === 403) {
            throw new Error(`Gmail auth failed (refresh token invalid/revoked): ${message}`);
        }
        if (status === 429) {
            throw new Error(`Gmail rate limit hit: ${message}`);
        }
        throw new Error(`Gmail send failed: ${message}`);
    }
};
//# sourceMappingURL=gmailSend.service.js.map