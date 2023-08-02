const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markSchema = new Schema({
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
  assignment_marks: { type: Number, required: true },
  quiz_marks: { type: Number, required: true },
  midterm_marks: { type: Number, required: true },
  final_marks: { type: Number, required: true },
});

const Mark = mongoose.model('Mark', markSchema);
module.exports = Mark;
