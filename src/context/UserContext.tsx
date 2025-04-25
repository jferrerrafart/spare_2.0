"use client";

import { UserContextType } from "@/types/types";
import { createContext, useContext, useState, ReactNode } from "react";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, wallet, setUserId, setWallet }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
