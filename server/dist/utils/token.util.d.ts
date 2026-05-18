import type { JwtPayload, TokenPair } from '../types/auth.types.js';
export declare const genrateJWT: (payload: JwtPayload) => string;
export declare const genrateRefreshToken: (payload: JwtPayload) => string;
export declare const generateTokenPair: (payload: JwtPayload) => TokenPair;
export declare const verifyJWT: (token: string) => JwtPayload;
export declare const verifyRefreshToken: (token: string) => JwtPayload;
//# sourceMappingURL=token.util.d.ts.map