import type { Response } from "express";

export const setTokenCookies =(res:Response,accessToken:string,refreshToken:string):void=>{
    res.cookie("token", accessToken,{
        httpOnly:true,
        secure: process.env.ENVIORNMENT === "production",
        sameSite: process.env.ENVIORNMENT === "production" ? "none" : "lax",
        maxAge: 1* 60* 1000
    });

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure: process.env.ENVIORNMENT === "production",
        sameSite: process.env.ENVIORNMENT === "production" ? 'none' : 'lax',
        maxAge: 2* 24* 60* 60* 1000,
        partitioned: true,
        path: "/api/auth/refresh"
    })

    //  console.log(res.getHeaders()["set-cookie"]);
};

export const clearTokenCookies = (res:Response):void=>{
    res.clearCookie("token",{
        sameSite: process.env.ENVIORNMENT === "production" ? 'none' : 'lax',
    });
    res.clearCookie("refreshToken",{path: '/api/auth/refresh',
        sameSite: process.env.ENVIORNMENT === "production" ? 'none' : 'lax'
    })
};