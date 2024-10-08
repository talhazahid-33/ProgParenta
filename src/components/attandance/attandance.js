import React, { useEffect, useState } from "react";
import axios from "axios";
import "./attandance.css";

const Attandance = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;




  
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(formattedDate);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const [newStudent, setNewStudent] = useState();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getAllClasses");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const getStudentsByClass = async () => {
    console.log("Selected Class:", selectedClass);
    if (selectedClass === "" || selectedClass === null) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/getStudentByClass",
        {
          Class: selectedClass,
        }
      );
      if (response.status === 200) {
        console.log("Students:", response.data);
        setStudents(response.data);
      } else {
        console.log("No students found for this class.");
      }
    } catch (error) {
      console.error("Error fetching students by class:", error);
    }
  };

  const handleCheckboxChange = (studentId) => {
    setAttendance({
      ...attendance,
      [studentId]: !attendance[studentId], // Toggle attendance checkbox for each student
    });
  };

  const addAttendance = async (student) => {
    const studentId = student.student_id;
    const status = student.present ? "present" : "absent";
    try {
      const response = await axios.post("http://localhost:5000/addAttendance", {
        student_id: studentId,
        date: date,
        status: status,
      });

      if (response.status === 200) {
        console.log("Attendance added successfully:", response.data);
      } else {
        console.log("Failed to add attendance.");
      }
    } catch (error) {
      console.error("Error adding attendance:", error);
    }
  };

  const saveAttendance = () => {
    if (students.length === 0) {
      alert("No student to mark attendance");
      return;
    }
    students.forEach((student) => {
      addAttendance(student);
      console.log({
        student_id: student.student_id,
        date: date,
        present: attendance[student.student_id] || false,
      });
    });
    setStudents([]);
    alert("Attendance Added Successfully");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = () => {
    setStudents([...students, newStudent]);
    setNewStudent(null);
  };

  return (
    <div className="attendance-container">
      <header className="attendance-header">
        <h2>Attendance</h2>
        <input type="text" placeholder="Search Here" className="search-bar" />
        <div className="user-avatar"></div>
      </header>

      <div className="filters">
        <select
          className="filter"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Class</option>
          {classes.map((cls, index) => (
            <option key={index} value={cls.Class}>
              {cls.Class}
            </option>
          ))}
        </select>
        <select className="filter">
          <option>Section</option>
        </select>
        <input
          type="date"
          className="filter"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="filter search-btn" onClick={getStudentsByClass}>
          Search
        </button>
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Roll No</th>
            <th>Name</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.rollno}</td>
              <td>{`${student.firstname} ${student.lastname}`}</td>
              <td>
                <input
                  type="checkbox"
                  checked={attendance[student.student_id] || false}
                  onChange={() => handleCheckboxChange(student.student_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <button onClick={saveAttendance} className="filter search-btn">
        Save Attendance{" "}
      </button>
    </div>
  );
};

export default Attandance;
