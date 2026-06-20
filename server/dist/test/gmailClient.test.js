import { prisma } from "../lib/prisma.js";
import { getGmailClient } from "../services/gmail.service.js";
export const sendTestEmail = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id, //Added non nullable assertion
            },
        });
        if (!user?.googleRefreshToken) {
            return res.status(400).json({
                error: "Google refresh token not found",
            });
        }
        const gmail = await getGmailClient(user.googleRefreshToken);
        // console.log(gmail);
        console.log("Gmail client ready for user:", user.email);
        res.json({
            message: "Gmail client created successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed",
        });
    }
};
//# sourceMappingURL=gmailClient.test.js.map