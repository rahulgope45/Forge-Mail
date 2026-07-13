import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

let isRefreshing = false;
let refreshQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (value?: unknown) => void;
}> = [];

function processQueue(error: unknown) {
    refreshQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve();
    });

    refreshQueue = [];
}

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (error.response?.status !== 401 || originalRequest._retry) {
            return  Promise.reject(error);
        }

        if (originalRequest.url?.includes("/auth/refresh")) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                refreshQueue.push({ resolve, reject })
            }).then(() => api(originalRequest));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            await api.post("/api/auth/refresh");
            processQueue(null);
            return api(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError);
            // hard redirect to login — refresh token is dead
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
)