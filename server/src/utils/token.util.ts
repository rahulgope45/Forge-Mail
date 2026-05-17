import jwt from 'jsonwebtoken';
import type { JwtPayload } from '../types/auth.types.js';

export const genrateJWT = (payload: JwtPayload):string =>{
    return jwt.sign(payload, process.env.JWT_SECRET!,{expiresIn: "1d"});
};

export const verifyJWT = (token: string):JwtPayload =>{
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
};