const auth = require('../middleware/auth');
const Student = require('../models/student');
const Mark = require('../models/marks');
const Attendance = require('../models/attendance');
const Course = require('../models/course');

const login = async (req, res) => {
  console.log("inlogin")
  try {
    const { rollNo, password } = req.body;
    const student = await Student.findOne({ rollNo });
console.log(student);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const passwordMatch = await auth.comparePasswords(password, student.hashedPassword);

    if (passwordMatch) {
      const token = auth.generateToken({ rollNo: student.rollNo });
      return res.json({ token });
      console.log(token);
    } else {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
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


const bookLibraryRoom = (req, res) => {
  const studentId = req.userId || req.params.studentId;

  const roomIdToBook = req.body.roomId;

  res.json({ message: 'Library room booked successfully.' });
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


const borrowBook = (req, res) => {
  const studentId = req.userId || req.params.studentId;
 
  const bookIdToBorrow = req.body.bookId;

  res.json({ message: 'Book borrowed successfully.' });
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
  bookLibraryRoom,
  checkGrades,
  borrowBook,
  giveFeedback,
  login,
};
