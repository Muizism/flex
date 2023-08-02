import React, { useState } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap'; // Import the required components from Bootstrap
import axios from 'axios';

const PayFee = () => {
  const [feeAmount, setFeeAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFeeAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the feeAmount to the backend API for payment
      await axios.post('http://localhost:3001/students/pay-fee', { feeAmount });
      setMessage('Fee paid successfully.');
    } catch (error) {
      console.error('Error paying fee:', error);
      setMessage('Failed to pay fee. Please try again.');
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

      {/* Pay Fee Content */}
      <div className="container mt-4">
        <h2>Pay Fee</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="feeAmount">
            <Form.Label>Fee Amount</Form.Label>
            <Form.Control
              type="number"
              value={feeAmount}
              onChange={handleInputChange}
              placeholder="Enter fee amount"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Pay Fee
          </Button>
        </Form>
        {message && <div className="mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default PayFee;
