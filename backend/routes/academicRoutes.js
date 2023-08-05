const express = require('express');
const academicsRouter = express.Router();
const auth = require('../middleware/auth');
const Academic = require('../models/academic');

const {
  registerCourse,
  dropCourse,
  changeSection,
  createTable,
  provideExamSchedule,
  Login,
  getAcademicById,
  deleteTimetableEntry,
  updateTimetableEntry,
} = require('../controllers/academicsController');

academicsRouter.post('/academic-login', Login);  
academicsRouter.post('/register-course',auth.VerifyUser,registerCourse);
academicsRouter.post('/drop-course',auth.VerifyUser, dropCourse);
academicsRouter.post('/change-section',auth.VerifyUser, changeSection);
academicsRouter.get('/timetable',auth.VerifyUser, createTable);
academicsRouter.put('/timetable/:id',auth.VerifyUser, updateTimetableEntry);
academicsRouter.delete('/timetable/:id',auth.VerifyUser, deleteTimetableEntry);
academicsRouter.get('/exam-schedule',auth.VerifyUser, provideExamSchedule);
academicsRouter.get('/academics/:id', async (req, res) => {
  try {
    const academic = await Academic.findById(req.params.id);
    res.json(academic);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching academic' });
  } 
});

module.exports = academicsRouter;
