import { OAuth2Client } from "google-auth-library";
import jwt from 'jsonwebtoken';
import { exchangeCodeForToken, getGoogleAuthUrl, getGoogleUser } from "../../services/auth.service.js";
import { generateTokenPair, genrateJWT, verifyRefreshToken } from "../../utils/token.util.js";
import { prisma } from "../../lib/prisma.js";
import { verify } from "node:crypto";
import { error } from "node:console";
import { clearTokenCookies, setTokenCookies } from "../../utils/cookie.util.js";
import { sendWelcomeMail } from "../../services/mail.service.js";
import { emailQueue } from "../../queues/welcomEmail.queue.js";
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
        const { accessToken, refreshToken } = generateTokenPair({
            id: googleUser.id,
            email: googleUser.email,
        });
        const user = await prisma.user.upsert({
            where: { googleID: googleUser.id },
            update: {
                email: googleUser.email,
                name: googleUser.name,
                avatar: googleUser.picture,
                refreshToken: refreshToken
            },
            create: {
                googleID: googleUser.id,
                email: googleUser.email,
                name: googleUser.name,
                avatar: googleUser.picture,
                refreshToken: refreshToken
            },
        });
        setTokenCookies(res, accessToken, refreshToken);
        //====== Setting workers here =====
        // sendWelcomeMail(user.email, user.name || "").catch((err)=>
        // console.error("Failed to send welcome mail:", err)
        // )
        await emailQueue.add("welcome-mail", {
            to: user.email,
            name: `Welcome back ${user.name}!`
        }, {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 5000,
            },
        });
        //============ Path no decided yet ===========
        res.redirect("/");
        console.log(`${user.name} Logged In  succesfully`);
        // console.log("=== Token Debug ===");
        // console.log("Access Token:", accessToken);
        // console.log("Refresh Token:", refreshToken);
        // console.log("===================");
    }
    catch (error) {
        console.error("OAuth callback error:", error);
        res.status(500).json({ error: "Authentication failed" });
    }
};
export const refresh = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken;
        if (!incomingRefreshToken) {
            res.status(401).json({ error: "No Refresh token" });
            return;
        }
        const decoded = verifyRefreshToken(incomingRefreshToken);
        //Checking token matches in the DB
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user || user.refreshToken !== incomingRefreshToken) {
            res.status(401).json({ error: "Invalid refresh token" });
            return;
        }
        const { accessToken, refreshToken: newRefreshToken } = generateTokenPair({
            id: user.id,
            email: user.email
        });
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: newRefreshToken },
        });
        setTokenCookies(res, accessToken, newRefreshToken);
        res.status(200).json({ message: "Tokens refreshed" });
    }
    catch (error) {
        res.status(401).json({ error: "Invalid or expired refresh token" });
    }
};
export const logout = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken;
        if (incomingRefreshToken) {
            const decoded = verifyRefreshToken(incomingRefreshToken);
            await prisma.user.update({
                where: { id: decoded.id },
                data: { refreshToken: null }
            });
        }
    }
    catch (error) {
        clearTokenCookies(res);
        res.status(200).json({ message: "Logged out" });
    }
};
//# sourceMappingURL=user.controller.js.map