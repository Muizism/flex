const express = require('express');
const academicsRouter = express.Router();

const {
  registerCourse,
  dropCourse,
  changeSection,
  provideTimetable,
  provideExamSchedule,
} = require('../controllers/academicsController');


academicsRouter.post('/register-course', registerCourse);
academicsRouter.post('/drop-course', dropCourse);
academicsRouter.post('/change-section', changeSection);
academicsRouter.get('/timetable', provideTimetable);
academicsRouter.get('/exam-schedule', provideExamSchedule);

module.exports = academicsRouter;
