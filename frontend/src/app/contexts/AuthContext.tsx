// src/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api } from "../lib/api-client";

type User = {
  id: string;
  email: string;
  name?: string;
  avatar: string;
  createdAt: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signInWithGoogle: () => void;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
};

type MeResponse ={
  user: User
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const { data } = await api.get<MeResponse>("/auth/me"); // === removed /api =====
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

  function signInWithGoogle() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;
  }

  async function logout() {
    await api.post("/auth/logout"); //==== proxy removed /api
    setUser(null);
    window.location.href = "/";
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithGoogle, logout, refetchUser: fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}