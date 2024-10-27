import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests
import "./meeting.css";
import { useNavigate } from "react-router-dom";
import AlertDialog from "./studentData";

const Meeting = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("teacher"));
  const [meetings, setMeetings] = useState([]); // State to store meeting records
  const [showModal, setShowModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [time, setTime] = useState("");
  const [student, setStudent] = useState();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/getMeetings")
  //     .then((response) => {
  //       setMeetings(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching meetings:", error);
  //     });
  // }, []);
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
      .post("http://localhost:5000/getMeetings", {
        email: data.email,
      })
      .then((response) => {
        console.log(response.data);

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

  const approveMeeting = () => {
    console.log(time);
    if (time === "") {
      alert("set time for meeting");
      return;
    }
    updateMeeting("Approve");
    closeModal();
  };

  const rejectMeeting = () => {
    updateMeeting("Reject");
    closeModal();
  };
  const updateMeeting = async (status) => {
    try {
      const response = await axios.post("http://localhost:5000/updateMeeting", {
        meeting_id: selectedMeeting.meeting_id,
        status: status,
        time: time,
      });

      if (response.status === 200) {
        console.log("Meeting updated successfully:", response.data);
      } else {
        console.error("Error updating meeting:", response.data.message);
      }
    } catch (error) {
      console.error("Error making the API request:", error.message);
    }
  };

 

  return (
    <div className="meeting-container">
      <header className="meeting-header">
        <h2>Meeting</h2>
        <div className="user-avatar"></div>
      </header>

      <section className="meeting-requests">
        <h3>Meeting Requests:</h3>
        {meetings.map((meeting) => (
          <div className="meeting-request" key={meeting.meeting_id}>
            <span>{meeting.subject}</span>
            <div>
              
              <AlertDialog student_id={meeting.student_id}/>
              <button
                className="details-button"
                onClick={() => handleDetailsClick(meeting)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Details</h3>
            <div className="modal-details">
              <div className="modal-field">
                <label>Meeting Date:</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>Meeting Topic:</label>
                <input type="text" value={selectedMeeting.subject} disabled />
              </div>
              <div className="modal-field">
                <label>Teacher ID:</label>
                <input type="text" value={selectedMeeting.teacher} disabled />
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
                <textarea value={selectedMeeting.message} disabled />
              </div>
            </div>
            <div className="modal-actions">
              <button className="reject-button" onClick={rejectMeeting}>
                Reject
              </button>
              <button className="approve-button" onClick={approveMeeting}>
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meeting;
