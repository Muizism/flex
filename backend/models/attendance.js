const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  student_id :{ type: String, required: true },
  course_id: { type: String, required: true },
  date: { type: Date },
  status: { type: String, enum: ['Present', 'Absent'], default: 'Present' },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
