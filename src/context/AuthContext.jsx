"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getStudentDetails } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /* On mount — rehydrate from localStorage */
  useEffect(() => {
    const stored = localStorage.getItem("hm_token");
    if (!stored) {
      setLoading(false);
      return;
    }
    setToken(stored);

    getStudentDetails(stored)
      .then((data) => setUser(data.student ?? data))
      .catch(() => {
        /* token expired / invalid — clear it */
        localStorage.removeItem("hm_token");
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback((newToken, userData) => {
    localStorage.setItem("hm_token", newToken);
    setToken(newToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("hm_token");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
