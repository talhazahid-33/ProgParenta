import React, { useState } from "react";
import "./attandance.css";

const Attandance = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    rollNo: "",
    name: "",
    date: "",
    present: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleAddStudent = () => {
    setStudents([...students, student]);
    setStudent({ rollNo: "", name: "", date: "", present: false });
  };

  return (
    <div className="attendance-container">
      <header className="attendance-header">
        <h2>Attendance</h2>
        <input type="text" placeholder="Search Here" className="search-bar" />
        <div className="user-avatar"></div>
      </header>

      <div className="filters">
        <select className="filter">
          <option>Class</option>
        </select>
        <select className="filter">
          <option>Section</option>
        </select>
        <input type="date" className="filter" />
      </div>

      <div className="form">
        <input
          type="text"
          name="rollNo"
          value={student.rollNo}
          onChange={handleInputChange}
          placeholder="Roll No"
        />
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="date"
          name="date"
          value={student.date}
          onChange={handleInputChange}
        />
        <input
          type="checkbox"
          name="present"
          checked={student.present}
          onChange={(e) =>
            setStudent({ ...student, present: e.target.checked })
          }
        />
        <button onClick={handleAddStudent}>+Add</button>
        <button>Save</button>
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Date</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
              <td>{student.date}</td>
              <td>{student.present ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attandance;
