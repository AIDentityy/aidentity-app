"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = {
  id: string;
  username: string;
  name: string;
  pfp?: string;
  bio?: string;
} | null;

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
  wallet: string | null;
  setWallet: (wallet: string | null) => void;
  logoutWallet: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [wallet, setWallet] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const storedWallet = localStorage.getItem("wallet");
    if (storedWallet) {
      setWallet(storedWallet);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (wallet) {
      localStorage.setItem("wallet", wallet);
    } else {
      localStorage.removeItem("wallet");
    }
  }, [wallet]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const logoutWallet = () => {
    setWallet(null);
    localStorage.removeItem("wallet");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        wallet,
        setWallet,
        logoutWallet,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
