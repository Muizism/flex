const auth = require('../middleware/auth');
const Student = require('../models/student');
const Mark = require('../models/marks');
const Attendance = require('../models/attendance');
const Course = require('../models/course');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

let Login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  
  Student.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(400).json({"Success": false, 'Message': 'User not found' });
      }
      
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          // Handle the error, e.g., log it or return an error response
          return res.status(500).json({ "Success": false, 'Message': 'Error comparing passwords' });
        }

        if (result === true) {
          // Passwords match, create a JWT token and send the response
          let token = jwt.sign({
            email: user.email,
            _id: user._id,
          }, process.env.JWT_SECRET, { expiresIn: '1h' });

          return res.status(200).json({"Success": true, user, token, 'Message': 'User logged in successfully' });
        } else {
          // Passwords do not match
          return res.status(400).json({"Success": false, 'Message': 'User login failed' });
        }
      });
    })
    .catch(err => {
      res.status(500).json({ "Success": false, 'Message': 'Error finding user' });
    });
};


const checkMarks = (req, res) => {
  const studentId = req.userId || req.params.studentId;

  Mark.find({ student: studentId })
    .then((marks) => {
      res.json(marks);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch marks data.' });
    });
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


const payFee = (req, res) => {
  const studentId = req.userId || req.params.studentId;
 
  const feeAmount = req.body.feeAmount;

  res.json({ message: 'Fee paid successfully.' });
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



const giveFeedback = (req, res) => {
  const studentId = req.userId || req.params.studentId;
  
  const feedbackMessage = req.body.message;

  res.json({ message: 'Feedback submitted successfully.' });
};

module.exports = {
  checkMarks,
  checkAttendance,
  withdrawCourse,
  payFee,
 
  checkGrades,

  giveFeedback,
  Login,
};
