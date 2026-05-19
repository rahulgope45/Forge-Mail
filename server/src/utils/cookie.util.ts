import type { Response } from "express";

export const setTokenCookies =(res:Response,accessToken:string,refreshToken:string):void=>{
    res.cookie("token", accessToken,{
        httpOnly:true,
        secure: process.env.ENVIORNMENT === "production",
        maxAge: 15* 60* 1000
    });

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure: process.env.ENVIORNMENT === "production",
        maxAge: 7* 24* 60* 60* 1000,
        path: "/api/auth/refresh"
    })
};

export const clearTokenCookies = (res:Response):void=>{
    res.clearCookie("token");
    res.clearCookie("refreshToken",{path: 'api/auth/refresh'})
}