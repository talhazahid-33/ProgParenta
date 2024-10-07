import React, { createContext, useState } from "react";

// Create the Auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to log in the user
  const login = () => {
    setIsAuthenticated(true);
  };

  // Function to log out the user
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
