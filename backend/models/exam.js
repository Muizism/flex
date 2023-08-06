const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
  examName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
