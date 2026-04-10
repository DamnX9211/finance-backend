export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
};

export interface RegisterResponse {
    name: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    role: "admin" | "analyst" | "viewer";
}