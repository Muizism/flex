const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  course_name: { type: String, required: true },
  course_id: { type: String, required: true },
  schedule: { type: String, required: true },
  capacity: { type: Number, required: true },
});

const Course = mongoose.model('Course', courseSchema);

// Hardcoded course entries
const hardcodedCourses = [
  {
    course_name: 'Math',
    course_id: 'MATH101',
    schedule: 'Monday 9:00 AM',
    capacity: 50,
  },
  {
    course_name: 'Science',
    course_id: 'SCI201',
    schedule: 'Tuesday 10:30 AM',
    capacity: 40,
  },
  {
    course_name: 'History',
    course_id: 'HIST301',
    schedule: 'Wednesday 1:00 PM',
    capacity: 30,
  },
  {
    course_name: 'English',
    course_id: 'ENG401',
    schedule: 'Thursday 3:30 PM',
    capacity: 45,
  },
];
const course_ids = hardcodedCourses.map(course => course.course_id);
// Insert hardcoded courses into the database
Course.insertMany(hardcodedCourses)
  .then((insertedCourses) => {
   // console.log('Hardcoded courses inserted:', insertedCourses);
  })
  .catch((error) => {
    console.error('Error inserting hardcoded courses:', error);
  });

module.exports = Course; // Export the Course model
