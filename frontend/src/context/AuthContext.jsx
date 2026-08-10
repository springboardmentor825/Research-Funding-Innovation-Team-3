import { createContext, useContext, useState } from "react";

function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(() => {
    const t = localStorage.getItem("token");
    return t ? decodeToken(t)?.role : null;
  });

  const login = (accessToken) => {
    localStorage.setItem("token", accessToken);
    setToken(accessToken);
    setRole(decodeToken(accessToken)?.role || null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}