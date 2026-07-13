"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api } from "../lib/api-client";

type User = {
    id: string
    email: string
    name?: string
} | null;

type AuthContextType = {
    user: User;
    loading: boolean;
    login: (email:string,password:string) => Promise<void>;
    logout: ()=> Promise<void>
    refetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);


async function fetchUser() {
    try {
      const { data } = await api.get("/api/auth/me"); // adjust if you don't have this
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function login(email:string, password:string) {
    const {data} = await api.post("/api/auth/login",{email,password});
    setUser(data.user);
  }

  async function logout() {
    await api.post("/api/auth/logout");
    setUser(null);
  }

  return(
  <AuthContext.Provider value={{user,loading,login,logout,refetchUser:fetchUser}}>
    {children}
  </AuthContext.Provider>
  )

}