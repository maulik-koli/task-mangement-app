"use client"
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { ApiError } from "@/types/api";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const api: AxiosInstance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void, reject: (reason?: any) => void }[] = [];

const processQueue = (error: any = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};


api.interceptors.request.use((config) => config);

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // network error
        if (!error.response) {
            const errorObj: ApiError = {
                code: "INTERNAL_SERVER_ERROR",
                message: "Unable to reach server. Please check your internet connection.",
                success: false,
                status: 500,
            };
            return Promise.reject(errorObj);
        }

        const status = error.response.status;
        const isAuthRoute = originalRequest.url?.includes('/auth/');

        // 401 error
        if (status === 401 && !isAuthRoute && originalRequest && !originalRequest._retry) {

            // already refreshing
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => api(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // call /refresh
                await axios.post(`${SERVER_URL}/auth/refresh`, {}, {
                    withCredentials: true
                });

                isRefreshing = false;
                processQueue(null);

                // retry block request
                return api(originalRequest);

            } catch (refreshError) {
                isRefreshing = false;

                const errorObj: ApiError = {
                    code: "UNAUTHORIZED",
                    message: "Session expired. Please login again.",
                    success: false,
                    status: 401,
                };

                // reject all requests
                processQueue(errorObj);

                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }

                return Promise.reject(errorObj);
            }
        }

        // other API errors
        const errorData = error.response.data as any;
        const errorObj: ApiError = {
            code: errorData?.code || "INTERNAL_SERVER_ERROR",
            message: errorData?.message || "Something went wrong",
            success: false,
            status: status,
        };

        return Promise.reject(errorObj);
    }
);

export default api;