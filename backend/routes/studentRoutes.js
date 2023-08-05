const express = require('express');
const studentRouter = express.Router();
const auth = require('../middleware/auth');


const {
  checkMarks,
  checkAttendance,
  withdrawCourse,
  payFee,
  bookLibraryRoom,
  checkGrades,
  borrowBook,
  giveFeedback,
  Login,
} = require('../controllers/studentController');

studentRouter.post('/login',Login);
studentRouter.get('/check-attendance',auth.VerifyUser, checkAttendance);
studentRouter.post('/withdraw-course',auth.VerifyUser, withdrawCourse);
studentRouter.post('/pay-fee',auth.VerifyUser, payFee);
studentRouter.get('/check-grades',auth.VerifyUser, checkGrades);
studentRouter.post('/give-feedback',auth.VerifyUser, giveFeedback);

studentRouter.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' });
  }
});


module.exports = studentRouter;
