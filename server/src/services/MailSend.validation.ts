const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Max_Recipients = 100;

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

export const validateMailSendRequest = (
    payload: Partial<MailSendRequestBody>
): ValidationResult => {

    const { to, subject, body, sendAt } = payload;

    if (!subject || typeof subject !== "string" || subject.trim() === "") {
        return { valid: false, error: "subject is required" };
    }

    if (!body || typeof body !== "string" || body.trim() === "") {
        return { valid: false, error: "body is required" };
    }

    if (to === undefined || to === null) {
        return { valid: false, error: "to is required" };
    }

    const recipients = Array.isArray(to) ? to : [to];

    if (recipients.length > Max_Recipients) {
        return {
            valid: false,
            error: `Cannot send to more than ${Max_Recipients} recipients per request`,
        };
    }

    const invalidEmail = recipients.filter(
        (email) => typeof email !== "string" || !EMAIL_REGEX.test(email)
    );

    if (invalidEmail.length > 0) {
        return {
            valid: false,
            error: `nvalid email address(es): ${invalidEmail.join(", ")}`
        }
    };

    const uniqueCount = new Set(recipients.map((e) => e.toLowerCase())).size; // Used Set to keep the recipients unique

    if (uniqueCount !== recipients.length) {
        return {
            valid: false,
            error: "Duplicate recipient email addresses in request"
        }
    }

    if (sendAt !== undefined) {
        const parsed = new Date(sendAt);

        if (Number.isNaN(parsed.getTime())) {
            return {
                valid: false, error: `Invalid sendAt date: ${sendAt}`
            }
        }

        if (parsed.getTime() < Date.now()){
            return {
                valid: false, error: `sendAt cannot be in the past`
            }
        }
    }


    return {
        valid: true
    }

};