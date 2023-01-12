import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const initialUser = { name: "Your Name", logged: false };

  const [user, setUser] = useState(savedUser || initialUser);

  const onLogin = () => {
    const updatedUser = { ...user, logged: true };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const onLogout = () => {
    const updatedUser = { ...user, logged: false };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
