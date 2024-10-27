import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function AlertDialog({ student_id }) {
  const [open, setOpen] = React.useState(false);

  const [student,setStudent]=React.useState({
    name:"",
    rollNo:"",

  });
  const fetchStudentById = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getStudentById",
        {
          student_id: id,
        }
      );

      if (response.status === 200) {
        setStudent(response.data);
      } else {
        setStudent(null);
      }
    } catch (err) {
      console.error("Error fetching student:", err);
      setStudent(null);
    }
  };

  const handleClickOpen = () => {
    fetchStudentById(student_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button  variant="contained" onClick={handleClickOpen}>
        Student Details
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Student Details
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong>Name:</strong> {student.firstname+" "+student.lastname} <br />
            <strong>Roll No:</strong> {student.rollno} <br />
            <strong>Class:</strong> {student.class} <br />
            <strong>Section:</strong> {student.section}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
