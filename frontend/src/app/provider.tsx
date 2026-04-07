import { AuthProvider } from "../features/auth/AuthContext";
import type { ChildrenProps } from "../types/common";

export default function Providers({ children }: ChildrenProps) {
  return <AuthProvider>{children}</AuthProvider>;
}