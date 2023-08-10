import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import stripePromise from './stripe'; 
import { Link } from 'react-router-dom';
import image from './logo.png';

const FeePayment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    rollNo: '',
    amount: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/students/pay-fee', formData);
      const { clientSecret } = response.data;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name,
          },
        },
      });

      if (error) {
        toast.error('Payment failed. Please try again.');
      } else {
        if (paymentIntent.status === 'succeeded') {
          toast.success('Payment successful!');
        } else {
          toast.error('Payment failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Fee payment error:', error);
      toast.error('Payment failed. Please try again.');
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
                <Link to="/withdraw-course" className="nav-link white-bold">Course Withdraw</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='table'> <h2>Fee Payment</h2>
      <Form onSubmit={handlePayment}>
        <Form.Group controlId="rollNo">
          <Form.Label>Roll Number</Form.Label>
          <Form.Control
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <CardElement />
        <Button variant="primary" type="submit" disabled={!stripe}>
          Pay Fee
        </Button>
      </Form></div>
     
      <ToastContainer />
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

const FeePaymentWithStripe = () => (
  <Elements stripe={stripePromise}>
    <FeePayment />
  </Elements>
);

export default FeePaymentWithStripe;
