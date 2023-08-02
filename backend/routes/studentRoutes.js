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
studentRouter.get('/check-marks',auth.VerifyUser, checkMarks);
studentRouter.get('/check-attendance',auth.VerifyUser, checkAttendance);
studentRouter.post('/withdraw-course',auth.VerifyUser, withdrawCourse);
studentRouter.post('/pay-fee',auth.VerifyUser, payFee);
studentRouter.get('/check-grades',auth.VerifyUser, checkGrades);
studentRouter.post('/give-feedback',auth.VerifyUser, giveFeedback);

module.exports = studentRouter;
