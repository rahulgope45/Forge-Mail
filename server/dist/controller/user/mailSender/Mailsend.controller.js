import { prisma } from "../../../lib/prisma.js";
import { createMailJob } from '../../../worker/Mailsend.producer.js';
import { validateMailSendRequest } from '../../../services/MailSend.validation.js';
export const sendMail = async (req, res) => {
    try {
        const userId = req.user.id;
        const payload = req.body;
        const validation = validateMailSendRequest(payload);
        if (!validation.valid) {
            return res.status(400).json({
                message: validation.error
            });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                googleRefreshToken: true
            }
        });
        if (!user?.googleRefreshToken) {
            return res.status(403).json({
                message: "Google account not connected. Please connect your Google account before sending mail."
            });
        }
        const { jobIds } = await createMailJob({
            userId,
            to: payload.to,
            subject: payload.subject,
            body: payload.body,
            sendAt: payload.sendAt,
        });
        return res.status(200).json({
            message: "Mail job(s) queued successfully",
            jobIds
        });
    }
    catch (error) {
        console.error("sendMail controller error:", error);
        return res.status(500).json({ error: "Failed to queue mail job(s)" });
    }
};
//# sourceMappingURL=Mailsend.controller.js.map