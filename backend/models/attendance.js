const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new mongoose.Schema({
  rollNo: {
    type: Schema.Types.ObjectId,
    ref: 'student',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late'],
    required: true,
  },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
