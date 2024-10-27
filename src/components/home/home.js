import React, { useEffect } from "react";
import "./home.css"; // Import custom CSS for Home page


import { useNavigate } from 'react-router-dom';
import PersonalInfo from "./Personal";
import ContactInfo from "./Contact";
import User from "../../Assessts/user.png";


function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth") !== "true") {
      navigate("/Login");
    } else {
      localStorage.setItem("intendedPage", "/");
    }
  });
  return (
    <div className="home-container">
      <div className="navbar bg-light p-3 rounded mb-4 d-flex align-items-center justify-content-between">
        <h5 className="mb-0">Home</h5>
        <div className="user-logo d-flex align-items-center">
          <img src={User} alt="User" className="rounded-circle" />
          <div className="circle-icon bg-secondary ms-2" />
        </div>
      </div>

      {/* Sections */}
      <div className="section mb-4">
        <div className="section-header bg-primary text-white p-2">
          Personal Information
        </div>
        <div className="section-body p-3 bg-light">
          {" "}
          <PersonalInfo/>
        </div>
      </div>

      <div className="section">
        <div className="section-header bg-primary text-white p-2">
          Contact Information
        </div>
        <div className="section-body p-3 bg-light">
          {" "}
          <ContactInfo/>
        </div>
      </div>
    </div>
  );
}

export default Home;
