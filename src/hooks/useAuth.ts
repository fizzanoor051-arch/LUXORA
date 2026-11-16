"use client";

import { useEffect, useState } from "react";

interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("luxora_user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: User, token: string) => {
    localStorage.setItem("luxora_user", JSON.stringify(userData));
    localStorage.setItem("luxora_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("luxora_user");
    localStorage.removeItem("luxora_token");
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}