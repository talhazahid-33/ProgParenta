import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';
import "./chat.css";

const Chat = () => {
  
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("auth") !== "true"){
      navigate('/Login'); 
    }
    else{
    localStorage.setItem("intendedPage","/Chat");
    }
  })
  const [activeUser, setActiveUser] = useState("Ahmad");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState({
    Ahmad: [],
    Ali: [],
    Hamza: [],
  });

  const handleUserClick = (user) => {
    setActiveUser(user);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory({
        ...chatHistory,
        [activeUser]: [...chatHistory[activeUser], message],
      });
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <ul>
          {["Ahmad", "Ali", "Hamza"].map((user) => (
            <li
              key={user}
              className={activeUser === user ? "active" : ""}
              onClick={() => handleUserClick(user)}
            >
              {user}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-window">
        <div className="chat-header">{activeUser}</div>
        <div className="chat-body">
          {chatHistory[activeUser].map((msg, index) => (
            <div key={index} className="chat-message">
              {msg}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type Here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>
            <i className="send-icon">&#9658;</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
