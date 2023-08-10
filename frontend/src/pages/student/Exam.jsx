import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import  { Link } from 'react-router-dom';
import image from './logo.png';

const ExamsTable = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:3001/students/show-exam');
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, []);

  return (
    <div >
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
                <Link to="/withdraw-course" className="nav-link white-bold">Course Withdaw</Link>
              </li>
            
              <li className="nav-item">
                <Link to="/check-attendance" className="nav-link white-bold">Attendance</Link>
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
      <div className='table'> <h2>Exam Information</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Exam Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam._id}>
              <td>{exam.examName}</td>
              <td>{new Date(exam.date).toLocaleDateString()}</td>
              <td>{exam.time}</td>
              <td>{exam.venue}</td>
            </tr>
          ))}
        </tbody>
      </Table></div>
     
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

export default ExamsTable;
