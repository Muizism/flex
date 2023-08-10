import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import image from './logo.png';
const DropCourse = () => {
  const [rollNo, setrollNo] = useState('');
  const [courseId, setCourseId] = useState('');
  const [message, setMessage] = useState('');

  const handleDropCourse = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/academics/drop-course', {
        studentId: rollNo, // Assuming you pass student's ID here
        courseId: courseId,
      });
      setMessage(`Course dropped for student with ID ${rollNo}`);
    } catch (error) {
      console.error('Failed to drop course:', error);
      setMessage('Failed to drop the course. Please try again.');
    }
  };

  return (
    <div>
       
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
                <Link to="/register-course" className="nav-link white-bold">Register Course</Link>
              </li>
              <li className="nav-item">
                <Link to="/exam-schedule" className="nav-link white-bold">Exam Schedule</Link>
              </li>
              <li className="nav-item">
                <Link to="/change-section" className="nav-link white-bold">Change Section</Link>
              </li>
             
              <li className="nav-item">
                <button className="btn btn-danger">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    <Container>
      <h2>Drop Course</h2>
      <Form onSubmit={handleDropCourse}>
        <Form.Group controlId="studentRollNumber">
          <Form.Label>Student Roll Number</Form.Label>
          <Form.Control
            type="text"
            value={rollNo}
            onChange={(e) => setrollNo(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="courseId">
          <Form.Label>Course ID to Drop</Form.Label>
          <Form.Control
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          Drop Course
        </Button>
        {message && <div className="mt-3">{message}</div>}
      </Form>
    </Container>
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

export default DropCourse;
