import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from './logo.png';
import { Link } from 'react-router-dom';

const AttendancePage = () => {
  const [rollNo, setRollNo] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const handleRollNoChange = (e) => {
    setRollNo(e.target.value);
  };

  const handleGetAttendance = async () => {
    try {
      const response = await axios.post('http://localhost:3001/students/getAttendance', { rollNo },{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching attendance records');
    }
  };

  return (
 
        <div> <nav className="navbar navbar-expand-lg ">
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
                <Link to="/withdraw-course" className="nav-link white-bold">Withdraw Course</Link>
              </li>
              <li className="nav-item">
                <Link to="/feedback" className="nav-link white-bold">Feedback</Link>
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
      <div className='table '> <h1>Attendance Page</h1>
      <Form>
        <Form.Group>
          <Form.Label>Enter Roll No:</Form.Label>
          <Form.Control type="text" value={rollNo} onChange={handleRollNoChange} />
        </Form.Group>
        <br />
        <Button variant="primary" onClick={handleGetAttendance}>
          Get Attendance
        </Button>
      </Form>
      <Row className="mt-3">
        <Col>
          <h2>Attendance Records</h2>
          <ul>
            {attendanceRecords.map((record, index) => (
              <li key={index}>
                Date: {new Date(record.date).toLocaleDateString()}, Status: {record.status}
              </li>
            ))}
          </ul>
        </Col>
      </Row></div>
     
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
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

export default AttendancePage;
