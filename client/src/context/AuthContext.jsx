import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setAuthToken } from "../services/api";
import authService from "../services/authService";

const AuthContext = createContext(null);
const storedUser = JSON.parse(localStorage.getItem("expense-tracker-user") || "null");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storedUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("expense-tracker-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("expense-tracker-user");
    }

    setAuthToken(user?.token || null);
  }, [user]);

  const login = async (payload) => {
    setIsLoading(true);
    try {
      const data = await authService.login(payload);
      setUser(data);
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload) => {
    setIsLoading(true);
    try {
      const data = await authService.register(payload);
      setUser(data);
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      user,
      token: user?.token || null,
      isAuthenticated: Boolean(user?.token),
      isLoading,
      login,
      register,
      logout
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
