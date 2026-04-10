export interface AuthContextType {
    token: string | null;
    role: string | null;
    login: (token: string, role: string) => void;
    logout: () => void;
}