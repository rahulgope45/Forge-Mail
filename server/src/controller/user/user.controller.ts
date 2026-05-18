
import type { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from 'jsonwebtoken'
import { exchangeCodeForToken, getGoogleAuthUrl, getGoogleUser } from "../../services/auth.service.js";
import { genrateJWT } from "../../utils/token.util.js";
import { prisma } from "../../lib/prisma.js";


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
        })


        //============ Path has no decided yet =====
        res.redirect("/")
        console.log(`${user.name} Logged In  succesfully`)
       
    } catch (error) {
        console.error("OAuth callback error:", error);
        res.status(500).json({ error: "Authentication failed" });

    }
}

export const logout = (_req: Request, res: Response): void => {
  res.clearCookie("token");
  res.redirect("/");
};
