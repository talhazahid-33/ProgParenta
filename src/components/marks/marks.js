import React, { useState } from "react";
import "./marks.css"; // Custom CSS
import AddMarksModal from "../modelForm/AddMarksModal";

function Marks() {
  const [showModal, setShowModal] = useState(false);
  const [marksData, setMarksData] = useState([
    {
      rollNo: "001",
      name: "John Doe",
      class: "Class 1",
      subject: "Math",
      obtainedMarks: 85,
      averageMarks: 85,
      totalMarks: 100,
    },
    {
      rollNo: "002",
      name: "Jane Smith",
      class: "Class 1",
      subject: "Math",
      obtainedMarks: 90,
      averageMarks: 90,
      totalMarks: 100,
    },
  ]); // Mock data for demonstration
  const [editIndex, setEditIndex] = useState(null); // State to keep track of which item is being edited
  const [selectedMark, setSelectedMark] = useState(null); // State to store selected mark for editing

  // Function to handle adding or editing marks
  const handleAddMarks = (newMarks) => {
    if (editIndex !== null) {
      // Update marks locally
      const updatedMarksData = [...marksData];
      updatedMarksData[editIndex] = newMarks;
      setMarksData(updatedMarksData);
      setEditIndex(null);
      setSelectedMark(null); // Clear selected mark after editing
    } else {
      // Add new marks locally
      setMarksData([...marksData, newMarks]);
    }

    setShowModal(false); // Close the modal after adding marks
  };

  // Handle edit
  const handleEdit = (index) => {
    setEditIndex(index); // Set the index of the marks to be edited
    setSelectedMark(marksData[index]); // Set the selected mark data
    setShowModal(true); // Open the modal for editing
  };

  // Handle delete
  const handleDelete = (index) => {
    const updatedMarksData = marksData.filter((_, i) => i !== index); // Remove the selected marks locally
    setMarksData(updatedMarksData);
  };

  return (
    <div className="marks-container">
      {/* Marks Navigation Bar */}
      <div className="navbar bg-light p-3 rounded mb-4 d-flex align-items-center justify-content-between">
        <h5 className="mb-0">Marks</h5>
        <div className="search-bar">
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Search Here"
          />
        </div>
        <div className="icons d-flex">
          <div
            className="circle-icon bg-secondary mx-2"
            onClick={() => setShowModal(true)} // Open modal on click
          >
            +
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filter-section d-flex justify-content-between mb-3">
        <div className="form-group">
          <label>Class:</label>
          <select className="form-control">
            <option>Class 1</option>
            <option>Class 2</option>
          </select>
        </div>
        <div className="form-group">
          <label>Section:</label>
          <select className="form-control">
            <option>Section A</option>
            <option>Section B</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add
        </button>
      </div>

      {/* Marks Table */}
      {marksData.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Obtained Marks</th>
              <th>Average Marks</th>
              <th>Total Marks</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {marksData.map((mark, index) => (
              <tr key={index}>
                <td>{mark.rollNo}</td>
                <td>{mark.name}</td>
                <td>{mark.class}</td>
                <td>{mark.subject}</td>
                <td>{mark.obtainedMarks}</td>
                <td>{mark.averageMarks}</td>
                <td>{mark.totalMarks}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No marks available. Add some marks to get started.</p> // Message when no data
      )}

      {/* Add Marks Modal */}
      <AddMarksModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleAddMarks={handleAddMarks}
        selectedMark={selectedMark} // Pass the selected mark to the modal
      />
    </div>
  );
}

export default Marks;
