import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import admn from "../../Assessts/admin.jpg";
import logo from "../../Assessts/logo.png";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demonstration purposes, you can navigate to the home page after form submission.
    navigate("/"); // Redirect to Home (frontend-only logic)
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

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
