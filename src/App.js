import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Home from "./components/home/home";
import Marks from "./components/marks/marks";
import Login from "./components/login/Login";
import Library from "./components/library/library";
import Chat from "./components/chat/chat";
import Attandance from "./components/attandance/attandance";
import Meeting from "./components/meeting/meeting";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="d-flex">
      <Sidebar /> {/* Always show Sidebar since there's no authentication */}
      <div className="content p-4" style={{ width: "100%" }}>
        <Routes>
          {/* Public route for Login */}
          <Route path="/login" element={<Login />} />
          {/* Public routes for other components */}
          <Route path="/" element={<Home />} />
          <Route path="/Marks" element={<Marks />} />
          <Route path="/Library" element={<Library />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Attandance" element={<Attandance />} />
          <Route path="/Meeting" element={<Meeting />} />
          {/* Optionally add a NotFound component for 404 handling */}
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
