export interface GoogleConfig {
    clientID: string;
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
//# sourceMappingURL=auth.types.d.ts.map