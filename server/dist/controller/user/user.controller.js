import { OAuth2Client } from "google-auth-library";
import jwt from 'jsonwebtoken';
import { exchangeCodeForToken, getGoogleAuthUrl, getGoogleUser } from "../../services/auth.service.js";
import { genrateJWT } from "../../utils/token.util.js";
import { prisma } from "../../lib/prisma.js";
export const googleLogin = async (req, res) => {
    const url = getGoogleAuthUrl();
    res.redirect(url);
};
export const googleCallback = async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) {
            res.status(400).json({ message: "Authorization code missing " });
            return;
        }
        const token = await exchangeCodeForToken(code);
        const googleUser = await getGoogleUser(token.access_token);
        const user = await prisma.user;
    }
    catch (error) {
    }
};
//# sourceMappingURL=user.controller.js.map