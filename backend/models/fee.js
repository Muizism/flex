const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feeSchema = new Schema({
  rollNo: {
    type: Schema.Types.ObjectId,
    ref: 'student',
    required: true,
  },
  amount: { type: Number },
  payment_date: { type: Date },
  status: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
});

const Fee = mongoose.model('Fee', feeSchema);

module.exports = Fee;
