import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth");
  if (isAuthenticated === "true") console.log(isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;
