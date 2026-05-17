import type { GoogleConfig } from "../types/auth.types.js";
import axios from "axios";
import type{ GoogleUser,GoogleTokenResponse } from "../types/auth.types.js";
import { googleConfig } from "../config/google.config.js";

export const getGoogleAuthUrl = ():string =>{
 const params  = new URLSearchParams({
    client_id : googleConfig.clientId,
    redirect_uri: googleConfig.redirectUri,
    response_type: "code",
    scope: googleConfig.scopes.join(" "),
    access_type: "offline",
    prompt: "consent",
 });
return `https://accounts.google.com/o/oauth2/v2/auth?${params}`
};

export const exchangeCodeForToken = async (
    code: string
): Promise<GoogleTokenResponse>=>{
    const {data} = await axios.post<GoogleTokenResponse>(
        "https://oauth2.googleapis.com/token",{
            code,
            client_id: googleConfig.clientId,
            client_secret: googleConfig.clientSecret,
            redirect_uri: googleConfig.redirectUri,
            grant_type: "authorization_code",
        }
    );
    return data;
};

export const getGoogleUser = async (
    accessToken :string
):Promise<GoogleUser>=>{
    const {data}= await axios.get<GoogleUser>(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {headers: {Authorization: `Bearer ${accessToken}`}}
    );
    return data
}