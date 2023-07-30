const express = require('express');
const academicsRouter = express.Router();
const auth = require('../middleware/auth');

const {
  registerCourse,
  dropCourse,
  changeSection,
  provideTimetable,
  provideExamSchedule,
  login,
} = require('../controllers/academicsController');

academicsRouter.post('/academic-login',auth.authenticateToken, login);  
academicsRouter.post('/register-course',auth.authenticateToken, registerCourse);
academicsRouter.post('/drop-course', dropCourse);
academicsRouter.post('/change-section', changeSection);
academicsRouter.get('/timetable', provideTimetable);
academicsRouter.get('/exam-schedule', provideExamSchedule);

module.exports = academicsRouter;
