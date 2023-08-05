import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Timetable() {
  const [courseData, setCourseData] = useState({
    department: '',
    courseName: '',
    section: '',
    date: '',
    time: ''
  });
  const [timetableData, setTimetableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseData.department || !courseData.courseName || !courseData.section || !courseData.date || !courseData.time) {
      toast.error('Please fill in all fields.'); // Show error toast for validation
      return;
    }

    if (isEditing) {
      // Edit existing entry
      const updatedData = timetableData.map((course, index) => (index === isEditing - 1 ? courseData : course));
      setTimetableData(updatedData);
      toast.success('Course edited successfully!'); // Show success toast for edit
    } else {
      // Add new entry
      setTimetableData([...timetableData, courseData]);
      toast.success('Course added successfully!'); // Show success toast for add
    }

    setCourseData({ department: '', courseName: '', section: '', date: '', time: '' });
    setIsEditing(false);
  }


  const handleEdit = (index) => {
    setCourseData(timetableData[index]);
    setIsEditing(index + 1); // To avoid 0 index (0 is considered as falsy)
  }

  const handleDelete = (index) => {
    const updatedData = timetableData.filter((_, i) => i !== index);
    setTimetableData(updatedData);
  }

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container">
          <Link to="/academic-home/:academicId" className="navbar-brand">Home</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/exam-schedule" className="nav-link">Exam Shedule</Link>
              </li>
              <li className="nav-item">
                <Link to="/register-course" className="nav-link">Register Course</Link>
              </li>
              <li className="nav-item">
                <Link to="/change-section" className="nav-link">Change Section</Link>
              </li>
              <li className="nav-item">
                <Link to="/drop-course" className="nav-link">Drop Course</Link>
              </li>
              {/* Add other routes/buttons as needed */}
            </ul>
          </div>
        </div>
      </nav>
      <h2 style={{ textAlign: "center" }}>Timetable</h2>

      <div className="row justify-content-center mb-3">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Department</label>
              <input type="text" name="department" value={courseData.department} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
              <label>Course Name</label>
              <input type="text" name="courseName" value={courseData.courseName} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
              <label>Section</label>
              <input type="text" name="section" value={courseData.section} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="text" name="date" value={courseData.date} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="text" name="time" value={courseData.time} onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">{isEditing ? 'Save Edit' : 'Add Course'}</button>
          </form>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Course Name</th>
                  <th>Section</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {timetableData.map((course, index) => (
                  <tr key={index}>
                    <td>{course.department}</td>
                    <td>{course.courseName}</td>
                    <td>{course.section}</td>
                    <td>{course.date}</td>
                    <td>{course.time}</td>
                    <td>
                      <button className="btn btn-sm btn-info mr-2" onClick={() => handleEdit(index)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* React-Toastify container */}
    </div>
  );
}

export default Timetable;
