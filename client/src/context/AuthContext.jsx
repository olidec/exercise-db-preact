import { createContext, useContext } from "react";

import { useLocalStorage } from "../hooks/localStorage.js";
import { askServer } from "../utils/connector.js";

const AuthContext = createContext({
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("user");

  const login = async (username, password) => {
    //TODO login logic
    const res = await askServer("/login", "POST", { username, password });
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
