const Course = require('../models/course');
const Academic = require('../models/academic');
const auth = require('../middleware/auth');
const Student = require('../models/student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Timetable = require('../models/timeTable');
const Exam = require('../models/exam');
let Login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  Academic.findOne({ email: email })
    .then(user => {
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ "Success": false, 'Message': 'User not found' });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ "Success": false, 'Message': 'Error comparing passwords' });
        }

        if (result === true) {
          let token = jwt.sign({
            email: user.email,
            _id: user._id,
          }, process.env.JWT_SECRET, { expiresIn: '1h' });

          return res.status(200).json({ "Success": true, user, token, 'Message': 'User logged in successfully' });
        } else {
          console.log("Password comparison failed");
          return res.status(400).json({ "Success": false, 'Message': 'User login failed' });
        }
      });
    })
    .catch(err => {
      console.error("Error finding user:", err);
      res.status(500).json({ "Success": false, 'Message': 'Error finding user' });
    });
};


const addCourseToStudent = async (req, res) => {
  try {
    const { rollNo, courseId } = req.body;
    console.log(req.body);

    const student = await Student.findOne({ rollNo });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }


   
    const course_ids = ['MATH101', 'SCI201', 'HIST301', 'ENG401'];

    if (!course_ids.includes(courseId)) {
      console.log('Input courseId:', courseId);
      console.log('Available course IDs:', course_ids);
      return res.status(404).json({ message: 'Course not found' });
    }


    if (student.courses.includes(courseId)) {
      return res.status(400).json({ message: 'Student is already enrolled in the course' });
    }


    student.courses.push(courseId);
    await student.save();

    res.json({ message: 'Course added to student successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const dropCourse = async (req, res) => {
  try {
    const { rollNo, courseId } = req.body;
    console.log(req.body);

    const student = await Student.findOne({ rollNo });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (!student.courses.includes(courseId)) {
      return res.status(400).json({ message: 'Student is not enrolled in the course' });
    }

    student.courses = student.courses.filter(course => course !== courseId);
    await student.save();

    res.json({ message: 'Course removed from student successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const changeSection = async (req, res) => {
  try {
    const { rollNo, newSection } = req.body;

    const student = await Student.findOne({ rollNo });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // if (student.courses.length === 0) {
    //   return res.status(403).json({ message: 'Student is not enrolled in any courses' });
    // }

    student.section = newSection;
    await student.save();
    
    res.json({ message: 'Section updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getAcademicById = (req, res) => {
  const academicId = req.params.id;

  Academic.findById(academicId)
    .then((academic) => {
      if (!academic) {
        return res.status(404).json({ error: 'Academic not found.' });
      }
      res.json(academic);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch academic information.' });
    });
};


const createTable = async (req, res) => {
  const { department, courseName, section, date, time } = req.body;

  try {
    const newTimetableEntry = await Timetable.create({
      department,
      courseName,
      section,
      date,
      time,
    });

    res.status(201).json(newTimetableEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating timetable entry' });
  }
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

const updateTimetableEntry = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedEntry = await Timetable.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update timetable entry.' });
  }
};
const deleteTimetableEntry = async (req, res) => {
  const { id } = req.params;

  try {
    await Timetable.findByIdAndDelete(id);
    res.json({ message: 'Timetable entry deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete timetable entry.' });
  }
};
const viewTimetable = async (req, res) => {
  try {
    const timetableEntries = await Timetable.find();
    res.json(timetableEntries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch timetable entries.' });
  }
};
const createExamSchedule = async (req, res) => {
  const { examName, date, time, venue } = req.body;

  try {
    const newExamEntry = await Exam.create({
      examName,
      date,
      time,
      venue,
    });

    res.status(201).json(newExamEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating exam schedule entry' });
  }
};
const updateExamSchedule = async (req, res) => {
  const { examName, date, time, venue } = req.body;
  const examId = req.params.id;

  try {
    const updatedExamEntry = await Exam.findByIdAndUpdate(
      examId,
      {
        examName,
        date,
        time,
        venue,
      },
      { new: true }
    );

    if (!updatedExamEntry) {
      return res.status(404).json({ message: 'Exam schedule entry not found' });
    }

    res.status(200).json(updatedExamEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating exam schedule entry' });
  }
};

const deleteExamScheduleEntry = async (req, res) => {
  const examId = req.params.id;

  try {
    const deletedExamEntry = await Exam.findByIdAndDelete(examId);

    if (!deletedExamEntry) {
      return res.status(404).json({ message: 'Exam schedule entry not found' });
    }

    res.status(200).json({ message: 'Exam schedule entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting exam schedule entry' });
  }
};
const viewExamSchedule = async (req, res) => {
  try {
    const examEntries = await Exam.find();
    res.status(200).json(examEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching exam schedule' });
  }
};
module.exports = {
  addCourseToStudent,
  dropCourse,
  changeSection,
  createTable,
  provideExamSchedule,
  Login,
  getAcademicById,
  deleteTimetableEntry,
  updateTimetableEntry,
  viewTimetable,
  viewExamSchedule,
  deleteExamScheduleEntry,
  updateExamSchedule,
  createExamSchedule,
  
};
