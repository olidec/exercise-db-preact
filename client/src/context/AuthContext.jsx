import { createContext, useContext } from "react";

import { useLocalStorage } from "../hooks/localStorage.js";

const AuthContext = createContext({
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("user");

  const login = (username, password) => {
    //TODO login logic
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
