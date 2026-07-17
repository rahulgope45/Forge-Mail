import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";


export const api = axios.create({
  baseURL: '/api',
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

    const isRefreshCall = originalRequest.url?.includes("/auth/refresh");
    // const isAuthCheck = originalRequest.url?.includes("/auth/me");

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isRefreshCall 
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
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
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);