import React, { useEffect, useState } from "react";
import axios from "axios";
import "../attandance/attandance.css";

const Attandance = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [date, setDate] = useState(formattedDate);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [testType, setTestType] = useState("");

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getAllClasses");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getAllSubjects");
      console.log(response.data);
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
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

  const handleInputChange = (studentId, value) => {
    setMarks({
      ...marks,
      [studentId]: value,
    });
  };

  const addMarks = async ({
    student_id,
    subject_id,
    test_type,
    score,
    max_score,
    date,
  }) => {
    try {
      const response = await axios.post("http://localhost:5000/addMarks", {
        student_id,
        subject_id,
        test_type,
        score,
        max_score,
        date,
      });

      if (response.status === 201) {
        console.log("Marks added successfully:", response.data);
        return response.data; // Return the added marks data
      } else {
        console.error("Failed to add marks:", response.data);
        return null; // Indicate failure
      }
    } catch (error) {
      console.error("Error adding marks:", error);
      return null; // Indicate failure
    }
  };

  const saveMarks = () => {
    if (students.length === 0) {
      alert("No student to mark.");
      return;
    }
    if (testType === "" || totalMarks === "") {
      alert("Test type and Total Marks are necessary");
      return;
    }
    const subject_id = getSubjectIdByName(selectedSubject);
    students.forEach((student) => {
      const newMark = {
        student_id: student.student_id,
        subject_id: subject_id,
        test_type: testType,
        score:  marks[student.student_id] || 0,
        max_score: totalMarks,
        date: date,
      };

      addMarks(newMark);

      console.log({
        student_id: student.student_id,
        date: date,
        marks: marks[student.student_id] || 0,
      });
    });
    setStudents([]);
    alert("Marks Added Successfully");
  };
  function getSubjectIdByName( subjectName) {
    const subject = subjects.find(sub => sub.Name === subjectName);
    return subject ? subject.subject_id : "90"; 
}


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
        <select
          className="filter"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">subject</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject.Name}>
              {subject.Name}
            </option>
          ))}
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
      <div className="marks-input-row">
        <input
          type="number"
          placeholder="Total Marks"
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
          className="marks-input"
        />
        <input
          type="text"
          placeholder="Test Type"
          value={testType}
          className="marks-input"
          onChange={(e) => setTestType(e.target.value)}
        />
        <br />
        <br />
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Roll No</th>
            <th>Name</th>
            <th>Marks</th>
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
                  type="number"
                  value={marks[student.student_id] || ""}
                  onChange={(e) =>
                    handleInputChange(student.student_id, e.target.value)
                  }
                  placeholder="Enter Marks"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <button onClick={saveMarks} className="filter search-btn">
        Save Marks
      </button>
    </div>
  );
};

export default Attandance;
