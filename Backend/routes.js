// routes.js
const express = require('express');
const router = express.Router();
const controller = require('./controllers');

router.post('/login', controller.login);
router.post('/getMeetings',controller.getMeetings);
router.post('/deleteMeeting',controller.deleteMeeting);

router.post("/addAttendance",controller.addAttendance);
router.post("/addMarks",controller.addMarks);

router.post("/getStudentByClass",controller.getStudentsByClass);

router.get("/getAllClasses",controller.getAllClasses);

router.get("/getAllSubjects",controller.getAllSubjects);

module.exports = router;
    