const express = require('express');
const academicsRouter = express.Router();
const auth = require('../middleware/auth');

const {
  registerCourse,
  dropCourse,
  changeSection,
  provideTimetable,
  provideExamSchedule,
  Login,
} = require('../controllers/academicsController');

academicsRouter.post('/academic-login', Login);  
academicsRouter.post('/register-course',auth.VerifyUser,registerCourse);
academicsRouter.post('/drop-course',auth.VerifyUser, dropCourse);
academicsRouter.post('/change-section',auth.VerifyUser, changeSection);
academicsRouter.get('/timetable',auth.VerifyUser, provideTimetable);
academicsRouter.get('/exam-schedule',auth.VerifyUser, provideExamSchedule);

module.exports = academicsRouter;
