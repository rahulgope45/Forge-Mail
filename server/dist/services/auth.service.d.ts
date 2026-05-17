import type { GoogleUser, GoogleTokenResponse } from "../types/auth.types.js";
export declare const getGoogleAuthUrl: () => string;
export declare const exchangeCodeForToken: (code: string) => Promise<GoogleTokenResponse>;
export declare const getGoogleUser: (accessToken: string) => Promise<GoogleUser>;
//# sourceMappingURL=auth.service.d.ts.map