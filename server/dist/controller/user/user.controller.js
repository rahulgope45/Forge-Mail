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
        const user = await prisma.user.upsert({
            where: { googleID: googleUser.id },
            update: {
                email: googleUser.email,
                name: googleUser.name,
                avatar: googleUser.picture,
            },
            create: {
                googleID: googleUser.id,
                email: googleUser.email,
                name: googleUser.name,
                avatar: googleUser.picture,
            },
        });
        const jwt = genrateJWT({ id: user.id, email: user.email });
        res.cookie("token", jwt, {
            httpOnly: true,
            secure: process.env.ENVIORNMENT === "production"
        });
        //============ Path has no decided yet =====
        res.redirect("/");
        console.log(`${user.name} Logged In  succesfully`);
    }
    catch (error) {
        console.error("OAuth callback error:", error);
        res.status(500).json({ error: "Authentication failed" });
    }
};
export const logout = (_req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};
//# sourceMappingURL=user.controller.js.map