import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackPage = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch all feedbacks for the logged-in student
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/students/getAllFeedbacks');
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
      const response = await axios.post('http://localhost:3001/students/giveFeedback', {
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
    <Container>
      <h2>Feedback Page</h2>
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

      <ToastContainer />
    </Container>
  );
};

export default FeedbackPage;
