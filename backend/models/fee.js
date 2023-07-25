const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feeSchema = new Schema({
  student_id: { type: String, required: true },
  amount: { type: Number },
  payment_date: { type: Date },
  status: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
});

const Fee = mongoose.model('Fee', feeSchema);

module.exports = Fee;
