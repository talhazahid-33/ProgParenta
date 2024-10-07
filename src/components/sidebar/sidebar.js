import React from "react";
import "./sidebar.css";
import Logo from "../../Assessts/logo.png";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
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
          <NavLink to="/Attandance" className="nav-link text-white">
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
        <button className="btn btn-light">Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
