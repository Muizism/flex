import React, { useState } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap'; // Import the required components from Bootstrap
import axios from 'axios';

const WithdrawCourse = () => {
  const [courseIdToRemove, setCourseIdToRemove] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setCourseIdToRemove(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the courseIdToRemove to the backend API for withdrawal
      await axios.post('http://localhost:3001/students/withdraw-course', {
        courseId: courseIdToRemove,
      });
      setMessage('Course withdrawal successful.');
    } catch (error) {
      console.error('Error withdrawing course:', error);
      setMessage('Failed to withdraw course. Please try again.');
    }
  };

  return (
    <div>
      {/* Bootstrap Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Student Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/check-attendance">Check Attendance</Nav.Link>
            <Nav.Link href="/check-grades">Check Grades</Nav.Link>
            {/* Add other navigation links here */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Withdraw Course Content */}
      <div className="container mt-4">
        <h2>Withdraw Course</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="courseIdToRemove">
            <Form.Label>Course ID to Remove</Form.Label>
            <Form.Control
              type="text"
              value={courseIdToRemove}
              onChange={handleInputChange}
              placeholder="Enter course ID"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Withdraw Course
          </Button>
        </Form>
        {message && <div className="mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default WithdrawCourse;
