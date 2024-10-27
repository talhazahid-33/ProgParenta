import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Home from "./components/home/home";
import Marks from "./components/marks/marks";
import Login from "./components/login/Login";
import Library from "./components/library/library";
import Chat from "./components/chat/chat";
import Attendance from "./components/attandance/attandance";
import Meeting from "./components/meeting/meeting";
import PrivateRoute from "./middleware/PrivateRoute";
import { AuthProvider, useAuth } from "./middleware/authContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { DisplayBarProvider } from "./middleware/sideBarContext";

function App() {


  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("auth")=== "true");

  useEffect(() => {
    const handleStorageChange = (event) => {
      console.log("Got New Change ");
      if (event.key === "auth") {
        setIsAuthenticated(event.newValue === "true");
      }
      
    };

    window.addEventListener("storage", handleStorageChange);

    
  }, [isAuthenticated]);

  
  return (
    <div className="d-flex">

      <DisplayBarProvider>
      {isAuthenticated && <Sidebar />}
      <div className="content p-4" style={{ width: "100%" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/Marks"
            element={
              <PrivateRoute>
                <Marks />
              </PrivateRoute>
            }
          />
          <Route
            path="/Library"
            element={
              <PrivateRoute>
                <Library />
              </PrivateRoute>
            }
          />
          <Route
            path="/Chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/Attendance"
            element={
              <PrivateRoute>
                <Attendance />
              </PrivateRoute>
            }
          />
          <Route
            path="/Meeting"
            element={
              <PrivateRoute>
                <Meeting />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
      </DisplayBarProvider>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
}
