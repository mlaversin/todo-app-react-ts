export type AuthUser = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
};

export type AuthUserContextType = {
  authUser: AuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};

export type AuthUserContextProviderProps = {
  children: React.ReactNode;
};
