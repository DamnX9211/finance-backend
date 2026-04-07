import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../../types/api";
import api from "../../shared/api/client";

export const RegisterApi = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const res = await api.post("/auth/register", data);
    return res.data;
}

export const LoginApi = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    const res = await api.post("/auth/login", data);
    return res.data;
}