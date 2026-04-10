import { createContext, useContext, useState } from "react";
import type { AuthContextType } from "../../types/auth";
import type { ChildrenProps } from "../../types/common";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [role, setRole] = useState<string | null>(
    localStorage.getItem("role")
  );

  const login = (token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setToken(token);
    setRole(role);
  };

  const logout = () => {
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};