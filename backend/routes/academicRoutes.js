const express = require('express');
const academicsRouter = express.Router();
const auth = require('../middleware/auth');
const Academic = require('../models/academic');

const {
  addCourseToStudent,
  dropCourse,
  changeSection,
  createTable,
  Login,
  deleteTimetableEntry,
  updateTimetableEntry,
  viewTimetable,
  viewExamSchedule,
  deleteExamScheduleEntry,
  updateExamSchedule,
  createExamSchedule
} = require('../controllers/academicsController');

academicsRouter.post('/academic-login', Login);  
academicsRouter.post('/register-course',addCourseToStudent);
academicsRouter.post('/drop-course', dropCourse);
academicsRouter.put('/change-section', changeSection);
academicsRouter.post('/timetable', createTable);
academicsRouter.put('/timetable/:id', updateTimetableEntry);
academicsRouter.delete('/timetable/:id', deleteTimetableEntry);
academicsRouter.get('/view-table',viewTimetable);
academicsRouter.get('/view-exam-schedule',viewExamSchedule);
academicsRouter.post('/create-exam-schedule', createExamSchedule);
academicsRouter.put('/update-exam-schedule/:id', updateExamSchedule);
academicsRouter.delete('/delete-exam-schedule/:id', deleteExamScheduleEntry);
academicsRouter.get('/academics/:id',auth.VerifyUser, async (req, res) => {
  try {
    const academic = await Academic.findById(req.params.id);
    res.json(academic);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching academic' });
  } 
});

module.exports = academicsRouter;
