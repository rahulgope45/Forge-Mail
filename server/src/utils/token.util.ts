import jwt from 'jsonwebtoken';
import type { JwtPayload, TokenPair } from '../types/auth.types.js';

export const genrateJWT = (payload: JwtPayload):string =>{
    return jwt.sign(payload, process.env.JWT_SECRET!,{expiresIn: "15m"});
};

export const genrateRefreshToken = (payload: JwtPayload): string =>{
    return jwt.sign(payload,process.env.REFRESH_SECRET!,{expiresIn:"2d"})
};

export const generateTokenPair = (payload: JwtPayload):TokenPair=>({
    accessToken: genrateJWT(payload),
    refreshToken: genrateRefreshToken(payload),
})

export const verifyJWT = (token: string):JwtPayload =>{
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
};

export const verifyRefreshToken = (token: string):JwtPayload =>{
    return jwt.verify(token,process.env.REFRESH_SECRET!) as JwtPayload
}