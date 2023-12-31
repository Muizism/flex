import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from './logo.png';

const ChangeSection = () => {
  const [studentRollNumber, setStudentRollNumber] = useState('');
  const [newSection, setNewSection] = useState('');

  const handleChangeSection = async (e) => {
    e.preventDefault();

    try {
      await axios.put('http://localhost:3001/academics/change-section', {
        rollNo: studentRollNumber, 
        newSection: newSection,
      });

      toast.success(`Course section changed for student with ID ${studentRollNumber}`);
    } catch (error) {
      console.error('Failed to change section:', error);
      toast.error('Failed to change the course section. Please try again.');
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
                <Link to="/drop-course" className="nav-link white-bold">Drop Course</Link>
              </li>
             
              <li className="nav-item">
                <button className="btn btn-danger">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Container className='changesection'>
        <h2>Change Course Section</h2>
        <Form onSubmit={handleChangeSection}>
          <Form.Group controlId="studentRollNumber">
            <Form.Label>Student Roll Number</Form.Label>
            <Form.Control
              type="text"
              value={studentRollNumber}
              onChange={(e) => setStudentRollNumber(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="newSection">
            <Form.Label>New Section</Form.Label>
            <Form.Control
              type="text"
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              required
            />
          </Form.Group>
          <br></br>
          <Button variant="info" type="submit">
            Change Section
          </Button>
        </Form>
        <ToastContainer />
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

export default ChangeSection;
