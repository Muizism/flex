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
  login,
} = require('../controllers/studentController');

studentRouter.post('/login', auth.authenticateToken,login);
studentRouter.get('/check-marks', checkMarks);
studentRouter.get('/check-attendance', checkAttendance);
studentRouter.post('/withdraw-course', withdrawCourse);
studentRouter.post('/pay-fee', payFee);
studentRouter.post('/book-library-room', bookLibraryRoom);
studentRouter.get('/check-grades', checkGrades);
studentRouter.post('/borrow-book', borrowBook);
studentRouter.post('/give-feedback', giveFeedback);

module.exports = studentRouter;
