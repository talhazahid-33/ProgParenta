// routes.js
const express = require('express');
const router = express.Router();
const controller = require('./controllers');

router.post('/login', controller.login);
router.post('/getMeetings',controller.getMeetings);
router.post('/deleteMeeting',controller.deleteMeeting);

router.post("/addAttendance",controller.addAttendance);

router.post("/getStudentByClass",controller.getStudentsByClass);

module.exports = router;
