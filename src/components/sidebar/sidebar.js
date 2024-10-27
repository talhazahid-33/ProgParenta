import React, { useState } from "react";
import "./sidebar.css";
import Logo from "../../Assessts/logo.png";
import { NavLink } from "react-router-dom";
import { AuthProvider } from "../../middleware/authContext";
import { useAuth } from "../../middleware/authContext";
import { useNavigate } from "react-router-dom";
import { useDisplayBar } from "../../middleware/sideBarContext";

function Sidebar() {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const handleLogOut = () => {
    toggleDisplayBar(false);
    localStorage.clear();
    navigate("/Login");
    logout();
  };
  const { displayBar, toggleDisplayBar } = useDisplayBar();
  console.log("disp bar : ",displayBar);
  
  return (
    <div>
      {displayBar && (
        <>
          <div className="sidebar d-flex flex-column align-items-center p-3 bg-dark text-white vh-100">
            <div className="logo mb-4">
              <img src={Logo} alt="Logo" className="rounded-circle" />
            </div>

            <ul className="nav flex-column text-center w-100">
              <li className="nav-item mb-3">
                <NavLink to="/" className="nav-link text-white">
                  Home
                </NavLink>
              </li>
              <li className="nav-item mb-3">
                <NavLink to="/Marks" className="nav-link text-white">
                  Marks
                </NavLink>
              </li>

              <li className="nav-item mb-3">
                <NavLink to="/Attendance" className="nav-link text-white">
                  Attandance
                </NavLink>
              </li>

              <li className="nav-item mb-3">
                <NavLink to="/Meeting" className="nav-link text-white">
                  Meeting
                </NavLink>
              </li>

              <li className="nav-item mb-3">
                <NavLink to="/Chat" className="nav-link text-white">
                  Chat
                </NavLink>
              </li>

              <li className="nav-item mb-3">
                <NavLink to="/Library" className="nav-link text-white">
                  Library
                </NavLink>
              </li>
            </ul>
            <div className="mt-auto">
              <button className="btn btn-light" onClick={handleLogOut}>
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
