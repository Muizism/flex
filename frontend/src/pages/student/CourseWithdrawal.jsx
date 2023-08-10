import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from './logo.png';

const WithdrawCourse = () => {
  const [rollNo, setRollNo] = useState('');
  const [courseId, setCourseId] = useState('');

  const handleWithdrawCourse = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/academics/withdraw-course', {
        studentId: rollNo,
        courseId: courseId,
      });

      // Show a success toast
      toast.success('Course withdrawn successfully');

    } catch (error) {
      console.error('Failed to withdraw course:', error);

      // Show an error toast
      toast.error('Failed to withdraw the course. Please try again.');
    }
  };

  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light gradient-background">
        <div className="container">
        <Link to={`/home/${localStorage.getItem('userId')}`} className="navbar-brand">
            <img src={image} alt="Logo" width="150" height="150" />
          </Link>
          <div className="ml-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/show-table" className="nav-link white-bold">Time Table</Link>
              </li>
              <li className="nav-item">
                <Link to="/show-exam" className="nav-link white-bold">Exam Schedule</Link>
              </li>
            
              <li className="nav-item">
                <Link to="/check-attendance" className="nav-link white-bold">Attendance</Link>
              </li>
              <li className="nav-item">
                <Link to="/feedback" className="nav-link white-bold">Feedback</Link>
              </li>
              <li className="nav-item">
                <Link to="/payment" className="nav-link white-bold">Pay Fee</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Container className='table'>
        <h2>Withdraw Course</h2>
        <Form onSubmit={handleWithdrawCourse}>
          <Form.Group controlId="studentRollNumber">
            <Form.Label>Student Roll Number</Form.Label>
            <Form.Control
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="courseId">
            <Form.Label>Course ID to Withdraw</Form.Label>
            <Form.Control
              type="text"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="danger" type="submit">
            Withdraw Course
          </Button>
        </Form>
      </Container>
      <ToastContainer /> {/* React-toastify component */}
      <footer className='footer'>
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

export default WithdrawCourse;
