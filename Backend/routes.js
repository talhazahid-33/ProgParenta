// routes.js
const express = require('express');
const router = express.Router();
const controller = require('./controllers');
const bookController = require('./bookController');

router.post('/login', controller.login);
router.post('/getMeetings',controller.getMeetings);
router.post('/updateMeeting',controller.updateMeeting);
router.post('/deleteMeeting',controller.deleteMeeting);

router.post("/addAttendance",controller.addAttendance);
router.post("/addMarks",controller.addMarks);

router.post("/getStudentByClass",controller.getStudentsByClass);
router.post('/getStudentById',controller.getStudentById);

router.get("/getAllClasses",controller.getAllClasses);

router.get("/getAllSubjects",controller.getAllSubjects);


router.post("/uploadBook",bookController.uploadDocument);
router.post ("/addBook",bookController.addBook);
router.get("/getBooks",bookController.getBooks);
router.post("/deleteBook",bookController.deleteBook);

module.exports = router;
    