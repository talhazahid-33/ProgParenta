import React, { useState } from "react";
import "./meeting.css";

const Meeting = () => {
  const meetingRequests = [
    { id: 1, title: "Computer Science" },
    { id: 2, title: "Artificial Intelligence" },
    { id: 3, title: "Grammatical Mistakes" },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

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
      <header className="meeting-header">
        <h2>Meeting</h2>
        <div className="user-avatar"></div>
      </header>

      <section className="meeting-requests">
        <h3>Meeting Requests:</h3>
        {meetingRequests.map((request) => (
          <div className="meeting-request" key={request.id}>
            <span>{request.title}</span>
            <button
              className="details-button"
              onClick={() => handleDetailsClick(request)}
            >
              Details
            </button>
          </div>
        ))}
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Details</h3>
            <div className="modal-details">
              <div className="modal-field">
                <label>Name:</label>
                <input type="text" value="John Doe" disabled />
              </div>
              <div className="modal-field">
                <label>Roll No:</label>
                <input type="text" value="123" disabled />
              </div>
              <div className="modal-field">
                <label>Class:</label>
                <input type="text" value="10th" disabled />
              </div>
              <div className="modal-field">
                <label>Section:</label>
                <input type="text" value="A" disabled />
              </div>
              <div className="modal-field">
                <label>Subject:</label>
                <input type="text" value={selectedMeeting.title} disabled />
              </div>
              <div className="modal-field">
                <label>Email:</label>
                <input type="text" value="johndoe@example.com" disabled />
              </div>
              <div className="modal-field">
                <label>Message:</label>
                <textarea
                  value="Please approve this meeting request."
                  disabled
                />
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
