"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Store user + token in localStorage
  const login = (userObj, token) => {
    const cleanUser = {
      _id: userObj._id,
      name: userObj.name,
      email: userObj.email,
      role: userObj.role || "user", // ⭐ VERY IMPORTANT
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(cleanUser));
    setUser(cleanUser);
  };

  // ⭐ NORMAL LOGIN (EMAIL + PASSWORD)
  const signIn = async (email, password) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      login(data.user, data.token);
      return { success: true };

    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // ⭐ GOOGLE LOGIN
  const googleLogin = async (tokenId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenId }),
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      login(data.user, data.token);
      return { success: true };

    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // ⭐ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, googleLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}
