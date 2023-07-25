const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Student = require('./models/student');
const Course = require('./models/course');
const Enrollment = require('./models/enrollment');
const Marks = require('./models/marks');
const Attendance = require('./models/attendance');
const Fee = require('./models/fee');

dotenv.config();


mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });