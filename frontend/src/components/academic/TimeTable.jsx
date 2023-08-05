import React, { useState } from 'react';
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseData.department || !courseData.courseName || !courseData.section || !courseData.date || !courseData.time) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (isEditing) {
      const updatedData = timetableData.map((course, index) => (index === isEditing - 1 ? courseData : course));
      setTimetableData(updatedData);
      toast.success('Course edited successfully!');
    } else {
      setTimetableData([...timetableData, courseData]);
      toast.success('Course added successfully!');
    }

    setCourseData({ department: '', courseName: '', section: '', date: '', time: '' });
    setIsEditing(false);
  };

  const handleEdit = (index) => {
    setCourseData(timetableData[index]);
    setIsEditing(index + 1);
  };

  const handleDelete = (index) => {
    const updatedData = timetableData.filter((_, i) => i !== index);
    setTimetableData(updatedData);
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center' }}>Timetable</h2>

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
      <ToastContainer />
    </div>
  );
}

export default Timetable;
