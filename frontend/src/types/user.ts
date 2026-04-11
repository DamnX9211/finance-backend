export interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "analyst" | "viewer";
    is_active: boolean;
}