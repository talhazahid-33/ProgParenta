const pool = require("./db");

// exports.login = async (req, res) => {
//   console.log("Login Body : ", req.body);
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'email and password are required' });
//   }
//   try {
//     const query = 'SELECT * FROM TEACHER WHERE email = $1 AND password = $2';
//     const result = await pool.query(query, [email, password]);

//     if (result.rows.length > 0) {
//       res.status(200).json({ message: 'Login successful' ,teacher:result.rows[0]});
//     } else {
//       res.status(401).json({ error: 'Invalid credentials' });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
exports.login = async (req, res) => {
  console.log("Login Body : ", req.body); // Check if req.body contains the correct data
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  // Mock result for frontend testing without DB connection
  res.status(200).json({
    message: "Login successful",
    teacher: {
      id: 1, // Mock teacher ID
      name: "John Doe", // Mock teacher name
      email: email, // Return the email provided
    },
  });
};

exports.getMeetings = async (req, res) => {
  console.log("getMeetings ",req.body);
  const  teacher_email = req.body.email;
  console.log("getMeetings ",teacher_email);
  
  if (!teacher_email) {
    return res.status(400).json({ error: "Teacher email is required" });
  }

  try {
    const query = 'SELECT * FROM public."meetingRequest" WHERE teacher_email = $1';
 const result = await pool.query(query, [teacher_email]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: "No meetings found for this teacher" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateMeeting = async (req, res) => {
  console.log("updateMeeting request body:", req.body);

  const { status, time, meeting_id } = req.body;

  if (!meeting_id || !status || !time) {
    return res.status(400).json({ error: "Meeting ID, status, and time are required" });
  }

  try {
    const query = `
      UPDATE public."meetingRequest" 
      SET status = $1, "time" = $2
      WHERE meeting_id = $3
      RETURNING *;
    `;

    const result = await pool.query(query, [status, time, meeting_id]);

    if (result.rowCount > 0) {
      res.status(200).json({ message: "Meeting updated successfully", meeting: result.rows[0] });
    } else {
      res.status(404).json({ message: "Meeting not found with the provided ID" });
    }
  } catch (err) {
    console.error("Error updating meeting:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


exports.deleteMeeting = async (req, res) => {
  const { meeting_id } = req.body;

  if (!meeting_id) {
    return res.status(400).json({ error: "Meeting ID is required" });
  }

  try {
    const query = "DELETE FROM Meeting WHERE meeting_id = $1 RETURNING *";
    const result = await pool.query(query, [meeting_id]);

    if (result.rowCount > 0) {
      res.status(200).json({
        message: "Meeting deleted successfully",
        meeting: result.rows[0],
      });
    } else {
      res.status(404).json({ message: "Meeting not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};






exports.addAttendance = async (req, res) => {
  console.log(req.body);
  const { student_id, date, status, remarks, alert_sent } = req.body;

  if (!student_id || !date || !status) {
    return res
      .status(400)
      .json({ error: "Student ID, date, and status are required" });
  }

  try {
    const query = `
      INSERT INTO Attendance (student_id, date, status, remarks, alert_sent)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const values = [
      student_id,
      date,
      status,
      remarks || null,
      alert_sent || false,
    ];

    const result = await pool.query(query, values);

    res.status(200).json({
      message: "Attendance added successfully",
      attendance: result.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getStudentsByClass = async (req, res) => {
  const { Class } = req.body;
  if (!Class) {
    return res.status(400).json({ error: "Class name is required" });
  }
  try {
    const query = "SELECT * FROM public.student WHERE class = $1";
    const result = await pool.query(query, [Class]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: "No students found in this class" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getStudentById = async (req, res) => {
  const { student_id } = req.body;

  if (!student_id) {
    return res.status(400).json({ error: "Student ID is required" });
  }

  try {
    const query = "SELECT * FROM public.student WHERE student_id = $1";
    const result = await pool.query(query, [student_id]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Student not found with this ID" });
    }
  } catch (err) {
    console.error("Error fetching student by ID:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getAllClasses = async (req, res) => {
  try {
    const query = "SELECT * FROM public.classes";
    const result = await pool.query(query);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: "No classes found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const query = "SELECT * FROM public.subjects";
    const result = await pool.query(query);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: "No subjects found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addMarks = async (req, res) => {
  const { student_id, subject_id, test_type, score, max_score, date } =
    req.body;
  if (
    !student_id ||
    !subject_id ||
    !test_type ||
    score === undefined ||
    max_score === undefined ||
    !date
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const query = `
      INSERT INTO public.marks (student_id, subject_id, test_type, score, max_score, date)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const values = [student_id, subject_id, test_type, score, max_score, date];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
