const express = require('express');
const studentRouter = express.Router();
const auth = require('../middleware/auth');
const Student = require('../models/student');


const {

  checkAttendance,
  withdrawCourse,
  payFee,

  checkGrades,
  getTimetable,
  giveFeedback,
  Login,
  getAllExams,
} = require('../controllers/studentController');

studentRouter.post('/login',Login);
studentRouter.get('/check-attendance',auth.VerifyUser, checkAttendance);
studentRouter.post('/withdraw-course',auth.VerifyUser, withdrawCourse);
studentRouter.post('/pay-fee', payFee);
studentRouter.get('/check-grades',auth.VerifyUser, checkGrades);
studentRouter.post('/give-feedback',auth.VerifyUser, giveFeedback);
studentRouter.get('/show-exam', getAllExams);
studentRouter.get('/show-table', getTimetable);

studentRouter.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' });
  }
});


module.exports = studentRouter;
