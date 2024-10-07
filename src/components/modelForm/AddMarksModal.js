import React, { useState, useEffect } from "react";
import "./AddMarksModal.css";

function AddMarksModal({
  showModal,
  handleClose,
  handleAddMarks,
  selectedMark,
}) {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [classValue, setClassValue] = useState("");
  const [subject, setSubject] = useState("");
  const [obtainedMarks, setObtainedMarks] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  // Set form fields with selected mark data on edit
  useEffect(() => {
    if (selectedMark) {
      setRollNo(selectedMark.rollNo);
      setName(selectedMark.name);
      setClassValue(selectedMark.class);
      setSubject(selectedMark.subject);
      setObtainedMarks(selectedMark.obtainedMarks);
      setTotalMarks(selectedMark.totalMarks);
    } else {
      // Reset the form fields when adding a new mark
      setRollNo("");
      setName("");
      setClassValue("");
      setSubject("");
      setObtainedMarks("");
      setTotalMarks("");
    }
  }, [selectedMark]);

  const handleSubmit = () => {
    const newMarks = {
      rollNo,
      name,
      class: classValue,
      subject,
      obtainedMarks: Number(obtainedMarks), // Ensure obtainedMarks is a number
      totalMarks: Number(totalMarks), // Ensure totalMarks is a number
    };

    handleAddMarks(newMarks);
  };

  return (
    <div
      className={`modal ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {selectedMark ? "Edit Marks" : "Add Marks"}
            </h5>
            <button type="button" className="close" onClick={handleClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Roll No</label>
              <input
                type="text"
                className="form-control"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                readOnly={!!selectedMark} // Make Roll No read-only in edit mode
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Class</label>
              <input
                type="text"
                className="form-control"
                value={classValue}
                onChange={(e) => setClassValue(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                className="form-control"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Obtained Marks</label>
              <input
                type="number"
                className="form-control"
                value={obtainedMarks}
                onChange={(e) => setObtainedMarks(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Total Marks</label>
              <input
                type="number"
                className="form-control"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {selectedMark ? "Update Marks" : "Add Marks"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMarksModal;
