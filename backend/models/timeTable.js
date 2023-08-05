const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  department: String,
  courseName: String,
  section: String,
  date: String,
  time: String,
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
