import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import image from './logo.png';

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
      toast.success('Course registration successful');
      console.log(response.data); // You can log the response from the server if needed
    } catch (error) {
      setMessage('Course registration failed. Please try again.');
      toast.error('Course registration failed. Please try again.');
      console.error('Course registration error:', error);
    }
  };

  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-light bg-light gradient-background">
        <div className="container">
        <Link to={`/academic-home/${localStorage.getItem('userId')}`} className="navbar-brand">
            <img src={image} alt="Logo" width="150" height="150" />
          </Link>
          <div className="ml-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/timetable" className="nav-link white-bold">Time Table</Link>
              </li>
              <li className="nav-item">
                <Link to="/change-section" className="nav-link white-bold">Change Section</Link>
              </li>
              <li className="nav-item">
                <Link to="/exam-schedule" className="nav-link white-bold">Exam Schedule</Link>
              </li>
              <li className="nav-item">
                <Link to="/drop-course" className="nav-link white-bold">Drop Course</Link>
              </li>
             
              <li className="nav-item">
                <button className="btn btn-danger">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='register'>
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
    <footer>
  <div className="footer-content">
    <div className="footer-title">Connect with us</div>
    <div className="social-icons">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-facebook"></i>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram"></i>
      </a>
      {/* Add more social media links and icons as needed */}
    </div>
  </div>
</footer>
    </div>
  );
};

export default RegistrationForm;