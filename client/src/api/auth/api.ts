import api from "@/lib/axios";
import { LoginFormType, SignupFormType } from "@/schemas/auth-schema";
import { ApiResponse } from "@/types/api";


export const login = async (payload: LoginFormType): Promise<ApiResponse<null>> => {
    const res = await api.post("/auth/login", payload)
    return res.data
}

export const signup = async (payload: SignupFormType): Promise<ApiResponse<null>> => {
    const res = await api.post("/auth/signup", payload)
    return res.data
}

export const logout = async (): Promise<ApiResponse<null>> => {
    const res = await api.post("/auth/logout")
    return res.data
}