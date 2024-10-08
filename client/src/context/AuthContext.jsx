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
    const { status, response } = await askServer("/login", "POST", {
      username,
      password,
    });
    if (status === 200) {
      setUser({ ...response.data.user });
      window.location.assign("/find");
    } else {
      console.error(response);
      window.location.assign("/login");
    }
  };

  const logout = async () => {
    // setUser(null);
    await window.localStorage.clear();
    // window.localStorage.removeItem("user");
    document.cookie =
      "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    askServer("/logout", "DELETE");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
