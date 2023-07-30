const Course = require('../models/course');
const academic = require('../models/academic');
const auth = require('../middleware/auth');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const academic = await academic.findOne({ username });

    if (!academic) {
      return res.status(404).json({ error: 'academic not found' });
    }

    const passwordMatch = await auth.comparePasswords(password, academic.hashedPassword);

    if (passwordMatch) {
      const token = auth.generateToken({ username: academic.username });
      return res.json({ token });
    } else {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
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
  login,
};
