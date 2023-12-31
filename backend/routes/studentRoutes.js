const express = require('express');
const studentRouter = express.Router();
const auth = require('../middleware/auth');
const Student = require('../models/student');


const {

  getAttendance,
  withdrawCourse,
  payFee,
  giveFeedback,
  getAllFeedbacks,
  checkGrades,
  getTimetable,
  Login,
  getAllExams,
} = require('../controllers/studentController');

studentRouter.post('/login',Login);
studentRouter.get('/check-attendance',auth.VerifyUser, getAttendance);
studentRouter.post('/withdraw-course',auth.VerifyUser, withdrawCourse);
studentRouter.post('/pay-fee',auth.VerifyUser, payFee);
studentRouter.get('/check-grades',auth.VerifyUser, checkGrades);
studentRouter.get('/show-exam', getAllExams);
studentRouter.get('/show-table',auth.VerifyUser, getTimetable);
studentRouter.post('/give-feedback',giveFeedback);
studentRouter.get('/show-feedback', getAllFeedbacks);

studentRouter.get('/students/:id',auth.VerifyUser, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' });
  }
});


module.exports = studentRouter;
