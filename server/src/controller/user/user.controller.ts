
import type { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from 'jsonwebtoken'
import { exchangeCodeForToken, getGoogleAuthUrl, getGoogleUser } from "../../services/auth.service.js";
import { generateTokenPair, genrateJWT, verifyRefreshToken } from "../../utils/token.util.js";
import { prisma } from "../../lib/prisma.js";
import { clearTokenCookies, setTokenCookies } from "../../utils/cookie.util.js";
import { sendWelcomeMail } from "../../services/mail.service.js";
import { emailQueue } from "../../queues/welcomEmail.queue.js";
import type { AuthenticatedRequest } from "../../types/auth.types.js";


export const googleLogin = async (req: Request, res: Response) => {
    const url = getGoogleAuthUrl();
    res.redirect(url);
};

export const googleCallback = async (
    req: Request, res: Response
): Promise<void> => {
    try {
        const code = req.query.code as string;
        if (!code) {
            res.status(400).json({ message: "Authorization code missing " })
            return;
        }
        const token = await exchangeCodeForToken(code);
        
        const googleUser = await getGoogleUser(token.access_token);

        

        const existingUser = await prisma.user.findUnique({
            where: {googleID: googleUser.id},
        });

        const newUser = !existingUser;


        const user = await prisma.user.upsert({
            where: { googleID: googleUser.id },
            update: {
                email: googleUser.email,
                name: googleUser.name,
                avatar: googleUser.picture,
                googleRefreshToken: token.refresh_token ?? existingUser?.googleRefreshToken ?? null,
                //refreshToken: refreshToken,
            },
            create: {
                googleID: googleUser.id,
                email: googleUser.email,
                name: googleUser.name,
                avatar: googleUser.picture,
                googleRefreshToken: token.refresh_token ?? null,
                //refreshToken: refreshToken,
                
            },
        });

        const { accessToken, refreshToken } = generateTokenPair({
            id: user.id,
            email: user.email,
        });

         await prisma.user.update({
            where: { id: user.id },
            data:  { refreshToken },
        });

        console.log("JWT Refresh:", refreshToken);

        setTokenCookies(res, accessToken, refreshToken);

        //====== Setting workers here =====
        
        // sendWelcomeMail(user.email, user.name || "").catch((err)=>
        // console.error("Failed to send welcome mail:", err)
        // )

        // === shifted to worker for better efficency ===

        await emailQueue.add("welcome-mail",{
            to: user.email,
            name: newUser ? `Welcome abord, ${user.name}!` : `Welcome back, ${user.name}!`
        },{
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 5000,
            },
        })

        //============ Path no decided yet ===========
        res.redirect("/")
        console.log(`${user.name} Logged In  succesfully`)

        // console.log("=== Token Debug ===");
        // console.log("Access Token:", accessToken);
        // console.log("Refresh Token:", refreshToken);
        // console.log("===================");

    } catch (error) {
        console.error("OAuth callback error:", error);
        res.status(500).json({ error: "Authentication failed" });

    }
}

export const refresh = async (req: Request, res: Response): Promise<void> => {
    try {
         console.log("Refresh cookies:", req.cookies);
        const incomingRefreshToken = req.cookies?.refreshToken as string | undefined;
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
        })

        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: newRefreshToken },
        });

        setTokenCookies(res, accessToken, newRefreshToken);
        res.status(200).json({ message: "Tokens refreshed" });
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired refresh token" });
    }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken as string | undefined;

        if (incomingRefreshToken) {
            const decoded = verifyRefreshToken(incomingRefreshToken)

            await prisma.user.update({
                where: { id: decoded.id },
                data: { refreshToken: null }
            });
        }
    } catch (error) {
       console.error("Logout error:", error);
        
    }

    clearTokenCookies(res);
    res.status(200).json({ message: "Logged out" });
};


export const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.id },
            select: {
                id:        true,
                name:      true,
                email:     true,
                avatar:    true,
                createdAt: true,
                // never select refreshToken / googleRefreshToken here
            },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("getMe error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};