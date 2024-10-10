import React, { useEffect } from "react";
import "./home.css"; // Import custom CSS for Home page

import { useNavigate } from 'react-router-dom';

function Home() {
  
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("auth") !== "true"){
      navigate('/Login'); 
    }
    else{
    localStorage.setItem("intendedPage","/");
    }
  })
  return (
    <div className="home-container">
      {/* Home Navigation Bar */}
      <div className="navbar bg-light p-3 rounded mb-4 d-flex align-items-center">
        <h5 className="mb-0">Home</h5>
        <div className="ml-auto">
          {/* Icons or additional buttons could be placed here */}
          <div className="circle-icon bg-secondary mx-2" />
          <div className="circle-icon bg-secondary" />
        </div>
      </div>

      {/* Sections */}
      <div className="section mb-4">
        <div className="section-header bg-primary text-white p-2">
          Personal Information
        </div>
        <div className="section-body p-3 bg-light">
          {" "}
          {/* Content goes here */}{" "}
        </div>
      </div>

      <div className="section">
        <div className="section-header bg-primary text-white p-2">
          Contact Information
        </div>
        <div className="section-body p-3 bg-light">
          {" "}
          {/* Content goes here */}{" "}
        </div>
      </div>
    </div>
  );
}

export default Home;
