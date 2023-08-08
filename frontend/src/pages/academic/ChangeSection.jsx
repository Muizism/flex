import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
       <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container">
        <Link to={`/academic-home/${localStorage.getItem('userId')}`} className="navbar-brand">Home</Link>
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
              <li className="nav-item">
                <Link to="/exam-schedule" className="nav-link">Exam Schedule</Link>
              </li>
              <li className="nav-item">
                <Link to="/drop-course" className="nav-link">Drop Course</Link>
              </li>
        
            </ul>
          </div>
        </div>
      </nav>
      <Container>
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
          <Button variant="info" type="submit">
            Change Section
          </Button>
        </Form>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default ChangeSection;
