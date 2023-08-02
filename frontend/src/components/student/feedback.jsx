import React, { useState } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap'; // Import the required components from Bootstrap
import axios from 'axios';

const GiveFeedback = () => {
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFeedbackMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the feedbackMessage to the backend API for submission
      await axios.post('http://localhost:3001/students/give-feedback', {
        message: feedbackMessage,
      });
      setMessage('Feedback submitted successfully.');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('Failed to submit feedback. Please try again.');
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

      {/* Feedback Form */}
      <div className="container mt-4">
        <h2>Give Feedback</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="feedbackMessage">
            <Form.Label>Feedback Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={feedbackMessage}
              onChange={handleInputChange}
              placeholder="Enter your feedback"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Feedback
          </Button>
        </Form>
        {message && <div className="mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default GiveFeedback;
