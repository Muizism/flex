import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import image from './logo.png';

const FeedbackPage = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
   
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/students/show-feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/students/give-feedback', {
        feedbackText: feedbackText,
      });
      toast.success('Feedback submitted successfully!');
      setFeedbackText('');

      // Update the list of feedbacks
      setFeedbacks([...feedbacks, response.data]);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    }
  };

  return (
   
      <div>  <nav className="navbar navbar-expand-lg navbar-light bg-light gradient-background">
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
                <Link to="/withdawr-course" className="nav-link white-bold">Course Wihdraw</Link>
              </li>
              <li className="nav-item">
                <Link to="/payment" className="nav-link white-bold">Pay Fee</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='table'><h2>Feedback Page</h2>
      <Card>
        <Card.Body>
          <h4>Give Feedback</h4>
          <Form onSubmit={handleFeedbackSubmit}>
            <Form.Group controlId="feedbackText">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your feedback here"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Feedback
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <h4 className="mt-3">Your Feedbacks:</h4>
      <ul>
        {feedbacks.map((feedback, index) => (
          <li key={index}>{feedback.feedbackText}</li>
        ))}
      </ul>
</div>
      
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
</footer></div>
     
    
  );
};

export default FeedbackPage;
