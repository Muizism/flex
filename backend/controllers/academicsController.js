const Course = require('../models/course');
const academic = require('../models/academic');
const auth = require('../middleware/auth');

let Login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  
  academic.findOne({ email: email })
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


const registerCourse = (req, res) => {
  const academicId = req.userId || req.params.academicId;
  const courseIdToRegister = req.body.courseId;

  academic.findById(academicId)
    .then((academic) => {
      if (academic.courses.includes(courseIdToRegister)) {
        return res.status(400).json({ error: 'academic is already registered for this course.' });
      }

      academic.courses.push(courseIdToRegister);
      return academic.save();
    })
    .then((updatedacademic) => {
      res.json(updatedacademic);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to register for the course.' });
    });
};

const dropCourse = (req, res) => {
  const studentId = req.userId || req.params.studentId;
  const courseIdToDrop = req.body.courseId;

  Student.findByIdAndUpdate(
    studentId,
    { $pull: { courses: courseIdToDrop } },
    { new: true }
  )
    .then((updatedStudent) => {
      res.json(updatedStudent);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to drop the course.' });
    });
};

const changeSection = (req, res) => {
  const studentId = req.userId || req.params.studentId;
  const { courseId, newSection } = req.body;

  Course.findById(courseId)
    .then((course) => {
      if (!course) {
        return res.status(404).json({ error: 'Course not found.' });
      }

      if (!course.sections.includes(newSection)) {
        return res.status(400).json({ error: 'Invalid section for the course.' });
      }

      Student.findOneAndUpdate(
        { _id: studentId, courses: courseId },
        { $set: { 'courses.$.section': newSection } },
        { new: true }
      )
        .then((updatedStudent) => {
          if (!updatedStudent) {
            return res.status(404).json({ error: 'Course not found for the student.' });
          }
          res.json(updatedStudent);
        })
        .catch((err) => {
          res.status(500).json({ error: 'Failed to change the course section.' });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to change the course section.' });
    });
};

const provideTimetable = (req, res) => {
  const studentId = req.userId || req.params.studentId;

  Student.findById(studentId)
    .populate('courses', 'name section schedule')
    .exec()
    .then((student) => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found.' });
      }

      const timetable = student.courses.map((course) => ({
        courseId: course._id,
        courseName: course.name,
        section: course.section,
        schedule: course.schedule,
      }));

      res.json(timetable);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch the timetable.' });
    });
};

const provideExamSchedule = (req, res) => {
  const studentId = req.userId || req.params.studentId;

  Student.findById(studentId)
    .populate('courses', 'name section examDate')
    .exec()
    .then((student) => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found.' });
      }

      const examSchedule = student.courses
        .filter((course) => course.examDate)
        .map((course) => ({
          courseId: course._id,
          courseName: course.name,
          section: course.section,
          examDate: course.examDate,
        }));

      res.json(examSchedule);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch the exam schedule.' });
    });
};

module.exports = {
  registerCourse,
  dropCourse,
  changeSection,
  provideTimetable,
  provideExamSchedule,
  Login,
};
