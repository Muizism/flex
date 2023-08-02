const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  rollNo: {
    type: Schema.Types.ObjectId,
    ref: 'student',
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: 'course',
    required: true,
  },
  date: { type: Date },
  status: { type: String, enum: ['Present', 'Absent'], default: 'Present' },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
