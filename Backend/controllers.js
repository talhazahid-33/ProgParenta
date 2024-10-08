const pool = require("./db");

// exports.login = async (req, res) => {
//   console.log("Login Body : ", req.body);
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'email and password are required' });
//   }
//   try {
//     const query = 'SELECT * FROM TEACHERS WHERE email = $1 AND password = $2';
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

//commment kr dena payn
exports.login = async (req, res) => {
  console.log("Login Body : ", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    res.status(200).json({
      message: "Login successful",
      teacher: {
        id: 1,
        name: "John Doe",
        email: email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMeetings = async (req, res) => {
  const { teacherId } = req.body;

  if (!teacherId) {
    return res.status(400).json({ error: "Teacher ID is required" });
  }

  try {
    const query = "SELECT * FROM Meeting WHERE teacher_id = $1";
    const result = await pool.query(query, [teacherId]);

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

exports.deleteMeeting = async (req, res) => {
  const { Meetingid } = req.body;

  if (!Meetingid) {
    return res.status(400).json({ error: "Meeting ID is required" });
  }

  try {
    const query = "DELETE FROM Meeting WHERE meeting_id = $1 RETURNING *";
    const result = await pool.query(query, [Meetingid]);

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

    res.status(201).json({
      message: "Attendance added successfully",
      attendance: result.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getStudentsByClass = async (req, res) => {
  const { classname } = req.body;
  if (!classname) {
    return res.status(400).json({ error: "Class name is required" });
  }
  try {
    const query = "SELECT * FROM public.students WHERE classname = $1";
    const result = await pool.query(query, [classname]);

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
