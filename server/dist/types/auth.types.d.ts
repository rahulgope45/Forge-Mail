import type { Request } from "express";
export interface GoogleConfig {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    scopes: string[];
}
export interface GoogleUser {
    id: string;
    email: string;
    name: string;
    picture: string;
    verified_email: boolean;
}
export interface GoogleTokenResponse {
    access_token: string;
    refresh_token?: string;
    id_token: string;
    exprires_in: number;
    token_type: string;
}
export interface JwtPayload {
    id: string;
    email: string;
    iat?: number;
    exp?: number;
}
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
    refreshToken?: string;
}
//# sourceMappingURL=auth.types.d.ts.map