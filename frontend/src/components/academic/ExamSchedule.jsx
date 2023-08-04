import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function ExamSchedule() {
  const [examData, setExamData] = useState({
    examName: '',
    date: '',
    time: '',
    venue: ''
  });
  const [examSchedule, setExamSchedule] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData({ ...examData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!examData.examName || !examData.date || !examData.time) {
      toast.error('Please fill in all fields.'); // Show error toast for validation
      return;
    }

    setExamSchedule([...examSchedule, examData]);
    toast.success('Exam added successfully!'); // Show success toast for add

    setExamData({ examName: '', date: '', time: '',venue: '' });
  }

  const handleDelete = (index) => {
    const updatedSchedule = examSchedule.filter((_, i) => i !== index);
    setExamSchedule(updatedSchedule);
  }

  return (
    <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container">
          <Link to="/" className="navbar-brand">Home</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/timetable" className="nav-link">Time Table</Link>
              </li>
              <li className="nav-item">
                <Link to="/register-course" className="nav-link">Register Course</Link>
              </li>
              {/* Add other routes/buttons as needed */}
            </ul>
          </div>
        </div>
      </nav>
      <h2 style={{ textAlign: "center" }}>Exam Schedule</h2>

      <div className="row justify-content-center mb-3">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Exam Name</label>
              <input type="text" name="examName" value={examData.examName} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="text" name="date" value={examData.date} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="text" name="time" value={examData.time} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
              <label>Venue</label>
              <input type="text" name="venue" value={examData.venue} onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">Add Exam</button>
          </form>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Exam Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Venue</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {examSchedule.map((exam, index) => (
                  <tr key={index}>
                    <td>{exam.examName}</td>
                    <td>{exam.date}</td>
                    <td>{exam.time}</td>
                    <td>{exam.venue}</td>
                    <td>
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

export default ExamSchedule;
