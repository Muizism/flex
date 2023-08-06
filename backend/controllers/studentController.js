const auth = require('../middleware/auth');
const Student = require('../models/student');
const Mark = require('../models/marks');
const Attendance = require('../models/attendance');
const Course = require('../models/course');
const Exam = require('../models/exam');
const Timetable = require('../models/timeTable');
const Fee = require('../models/fee');
const Feedback = require('../models/feedback');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

let Login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  Student.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ "Success": false, 'Message': 'User not found' });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
      
          return res.status(500).json({ "Success": false, 'Message': 'Error comparing passwords' });
        }

        if (result === true) {
          // Passwords match, create a JWT token and send the response
          let token = jwt.sign({
            email: user.email,
            _id: user._id,
          }, process.env.JWT_SECRET, { expiresIn: '1h' });

          return res.status(200).json({ "Success": true, user, token, 'Message': 'User logged in successfully' });
        } else {
          // Passwords do not match
          return res.status(400).json({ "Success": false, 'Message': 'User login failed' });
        }
      });
    })
    .catch(err => {
      res.status(500).json({ "Success": false, 'Message': 'Error finding user' });
    });
};



const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find(); // Retrieve all exams from the database

    res.status(200).json(exams); // Send the array of exams as a JSON response
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({ message: 'Internal server error' }); // Handle errors with a 500 response
  }
};
const checkAttendance = (req, res) => {
  const studentId = req.userId || req.params.studentId;

  Attendance.find({ student: studentId })
    .then((attendance) => {
      res.json(attendance);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch attendance data.' });
    });
};


const withdrawCourse = (req, res) => {
  const studentId = req.userId || req.params.studentId;
  const courseIdToRemove = req.body.courseId;

  Student.findByIdAndUpdate(
    studentId,
    { $pull: { courses: courseIdToRemove } },
    { new: true }
  )
    .then((updatedStudent) => {
      res.json(updatedStudent);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to withdraw course.' });
    });
};


const payFee = async (req, res) => {
  try {
    const { rollNo, amount } = req.body;

    // Check if the student with the provided rollNo exists
    const existingFee = await Fee.findOne({ rollNo });

    if (!existingFee) {
      return res.status(404).json({ message: 'Student fee record not found' });
    }

    if (existingFee.status === 'Paid') {
      return res.status(400).json({ message: 'Fee has already been paid for this student' });
    }

    // Create a Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe requires the amount in cents
      currency: 'usd', // Change to your desired currency
      description: 'Student Fee Payment',
      metadata: { rollNo: rollNo }, // Attach any additional metadata you need
    });

    // Update the fee record status to 'Paid'
    existingFee.amount = amount;
    existingFee.status = 'Paid';

    await existingFee.save();

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const checkGrades = (req, res) => {
  const studentId = req.userId || req.params.studentId;


  Course.find({ students: { $elemMatch: { student: studentId, grade: { $ne: null } } } })
    .then((coursesWithGrades) => {
      res.json(coursesWithGrades);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch grades data.' });
    });
};

const getTimetable = async (req, res) => {
  try {
    const timetableData = await Timetable.find();
    res.json(timetableData);
  } catch (error) {
    console.error('Error fetching timetable:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const giveFeedback = async (req, res) => {
  try {
    const { studentId, teacherId, courseId, rating, comment } = req.body;

    const feedback = new Feedback({
      studentId,
      teacherId,
      courseId,
      rating,
      comment,
    });

    await feedback.save();

    res.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ message: 'Failed to submit feedback. Please try again.' });
  }
};
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Failed to fetch feedbacks' });
  }
};

module.exports = {

  checkAttendance,
  withdrawCourse,
  payFee,
  getAllExams,
  checkGrades,
  getTimetable,
  giveFeedback,
  getAllFeedbacks,
  Login,
};
