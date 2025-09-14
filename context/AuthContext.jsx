import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const handleLogin = (userData, token) => {
    console.log("Logged in user:", userData);
    setUser(userData);
    setToken(token);
   
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
   
  };

  useEffect(() => {
   

    // if (storedToken) {
    //   setToken(storedToken);
    // }
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};