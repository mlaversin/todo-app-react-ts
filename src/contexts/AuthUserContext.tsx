import { useState, createContext } from "react";
import {
  AuthUser,
  AuthUserContextType,
  AuthUserContextProviderProps,
} from "../types/AuthUser";

export const AuthUserContext = createContext<AuthUserContextType | null>(null);

export const AuthUserContextProvider = ({
  children,
}: AuthUserContextProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};
