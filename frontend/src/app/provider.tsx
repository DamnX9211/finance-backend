import { AuthProvider } from "../features/auth/AuthContext";

export default function Providers({ children }: any) {
  return <AuthProvider>{children}</AuthProvider>;
}