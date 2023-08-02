import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const RegisterCourse = () => {
  const [courseId, setCourseId] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setCourseId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the courseIdToRegister to the backend API for registration
      const response = await axios.post('http://localhost:3001/students/register-course', {
        courseId: courseId,
      });

      // Handle the response or show success message
      setMessage('Course registered successfully.');
    } catch (error) {
      console.error('Error registering course:', error);
      setMessage('Failed to register for the course. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register for a Course</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="courseId">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="text"
            value={courseId}
            onChange={handleInputChange}
            placeholder="Enter the Course ID"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      {message && <div className="mt-3 text-success">{message}</div>}
    </div>
  );
};

export default RegisterCourse;
