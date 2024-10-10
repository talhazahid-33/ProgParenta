import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  useEffect(()=>{
    const auth = localStorage.getItem("auth");
    console.log(auth);
    if(auth === "true"){
      console.log("Should be Login");
      setIsAuthenticated(true);
    }
    else
    setIsAuthenticated(false)
  },[])



  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("auth","true");
  };

  const logout = () => {
    localStorage.setItem("auth","false");
    setIsAuthenticated(false);
    
  };

  const getStatus = ()=>{
    
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
