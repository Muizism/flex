import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    rollNo: '',
    courseId: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/academics/register-course', formData);
      setMessage('Course registration successful');
      console.log(response.data); // You can log the response from the server if needed
    } catch (error) {
      setMessage('Course registration failed. Please try again.');
      console.error('Course registration error:', error);
    }
  };

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
                <Link to="/timetable" className="nav-link">Time Table</Link>
              </li>
              <li className="nav-item">
                <Link to="/exam-schedule" className="nav-link">Exam Schedule</Link>
              </li>
           
              <li className="nav-item">
                <Link to="/drop-course" className="nav-link">Drop Course</Link>
              </li>
                <li className="nav-item">
                <Link to="/changset" className="nav-link">Change Section</Link>
              </li>
              {/* Add other routes/buttons as needed */}
            </ul>
          </div>
        </div>
      </nav>
      <h2>Course Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Roll Number:</label>
          <input
            type="text"
            name="rollNo"
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Course ID:</label>
          <input
            type="text"
            name="courseId"
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register Course
        </button>
      </form>
      {message && <div>{message}</div>}
      <ToastContainer /> {/* React-Toastify container */}
    </div>
  );
};

export default RegistrationForm;