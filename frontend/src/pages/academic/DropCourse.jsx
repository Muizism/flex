import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
                <Link to="/change-section" className="nav-link">Change Section</Link>
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
    </div>
  );
};

export default DropCourse;
