import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  authUser: AuthUser | null;
  setauthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

interface AuthUser {
  _id: string;
  name: string;
  email: string;
  profileImg?: string;
  createdAt: string;
  provider: string;
}

const authContext = createContext<AuthContextType | null>(null);

export const UseAuthContext = (): AuthContextType => {
  const context = useContext(authContext);
  if (context === null) {
    throw new Error("Error in AuthContext");
  }
  return context;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [authUser, setauthUser] = useState<AuthUser | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  return (
    <authContext.Provider value={{ authUser, setauthUser }}>
      {children}
    </authContext.Provider>
  );
};
