import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";
import type { ChildrenProps } from "../../types/common";

export default function ProtectedRoute({ children }: ChildrenProps) {
    const {token} = useAuth();

    if(!token) return <Navigate to="/login" replace/>;

    return children;
}