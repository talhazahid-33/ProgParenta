import React, { useState, useEffect } from "react";
import axios from "axios";
import "./meeting.css";
import { useNavigate } from "react-router-dom";

const Meeting = () => {
  const navigate = useNavigate();

  const [meetings, setMeetings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("auth") !== "true") {
      navigate("/Login");
    } else {
      localStorage.setItem("intendedPage", "/Marks");
      getMeetings();
    }
  }, []);

  const getMeetings = () => {
    axios
      .get("http://localhost:5000/getMeetings", {
        params: { teacherId: 1 },
      })
      .then((response) => {
        setMeetings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching meetings:", error);
      });
  };

  const handleDetailsClick = (meeting) => {
    setSelectedMeeting(meeting);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMeeting(null);
  };

  return (
    <div className="meeting-container">
      <header className="navbar bg-light">
        <h2>Meeting</h2>
      </header>

      <section className="meeting-requests">
        <h3>Meeting Requests:</h3>
        {meetings.map((meeting) => (
          <div className="meeting-request" key={meeting.meeting_id}>
            <span>{meeting.meeting_topic}</span>
            <button
              className="details-button"
              onClick={() => handleDetailsClick(meeting)}
            >
              Details
            </button>
          </div>
        ))}
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Meeting Details</h3>
            <div className="modal-details">
              <div className="modal-field">
                <label>Meeting Date:</label>
                <input
                  type="text"
                  value={selectedMeeting.meeting_date}
                  disabled
                />
              </div>
              <div className="modal-field">
                <label>Meeting Topic:</label>
                <input
                  type="text"
                  value={selectedMeeting.meeting_topic}
                  disabled
                />
              </div>
              <div className="modal-field">
                <label>Teacher ID:</label>
                <input
                  type="text"
                  value={selectedMeeting.teacher_id}
                  disabled
                />
              </div>
              <div className="modal-field">
                <label>Student ID:</label>
                <input
                  type="text"
                  value={selectedMeeting.student_id}
                  disabled
                />
              </div>
              <div className="modal-field">
                <label>Remarks:</label>
                <textarea value={selectedMeeting.remarks} disabled />
              </div>
            </div>
            <div className="modal-actions">
              <button className="reject-button">Reject</button>
              <button className="approve-button">Approve</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meeting;
