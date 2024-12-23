import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../middleware/authContext";
import "./Login.css";
import admn from "../../Assessts/admin.jpg";
import logo from "../../Assessts/logo.png";
import { useDisplayBar } from "../../middleware/sideBarContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {  toggleDisplayBar } = useDisplayBar();
  
  useEffect(() => {
    checkSession();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log(data.teacher);
      localStorage.setItem("teacher",JSON.stringify(data.teacher));
      login();
      toggleDisplayBar(true);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const checkSession = () => {
    const intendedPage = localStorage.getItem("intendedPage");
    const auth = localStorage.getItem("auth");
    if (auth === "true" && intendedPage) {
      console.log(intendedPage);
      navigate(intendedPage);
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <img src={admn} alt="Login" className="login-image" />
      </div>
      <div className="right-section">
        <div className="login-form">
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" className="img-fluid logo" />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}{" "}
          {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email" // Set the input type to email
                className="form-control"
                id="email" // Change the ID to email
                placeholder="Email"
                value={email} // Bind the email state
                onChange={(e) => setEmail(e.target.value)} // Update the email state
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
