import { createContext, useContext, useState } from "react";
import type { AuthContextType } from "../../types/auth";
import type { ChildrenProps } from "../../types/common";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
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