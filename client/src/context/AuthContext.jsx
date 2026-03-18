import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        setLoading(false);
        return;
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        setUser({
            id: payload.userId
        });
    } catch (err) {
        console.error("Invalid Token", err);
        localStorage.removeItem("token");
    }

    setLoading(false)
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}