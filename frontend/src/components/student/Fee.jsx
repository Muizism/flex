import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import stripePromise from './stripe'; // Path to your stripe.js file

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
    <Container>
      <h2>Fee Payment</h2>
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
      </Form>
      <ToastContainer />
    </Container>
  );
};

const FeePaymentWithStripe = () => (
  <Elements stripe={stripePromise}>
    <FeePayment />
  </Elements>
);

export default FeePaymentWithStripe;
