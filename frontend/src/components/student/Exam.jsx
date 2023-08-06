import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import  { Link } from 'react-router-dom';

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
    <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/home/:studentId" className="navbar-brand">Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/check-attendance" className="nav-link">Check Attendance</Link>
            </li>
            <li className="nav-item">
              <Link to="/withdraw-course" className="nav-link">Withdraw Course</Link>
            </li>
            <li className="nav-item">
              <Link to="/pay-fee" className="nav-link">Pay Fee</Link>
            </li>
            <li className="nav-item">
              <Link to="/check-grades" className="nav-link">Check Grades</Link>
            </li>
            <li className="nav-item">
              <Link to="/give-feedback" className="nav-link">Give Feedback</Link>
            </li>
           
            <li className="nav-item">
              <Link to="/show-table" className="nav-link">Show Timetable</Link>
            </li>
            <li className="nav-item">
              <Link to="/payment" className="nav-link">Pay Fee</Link>
            </li>
            {/* Add other routes/buttons as needed */}
          </ul>
        </div>
      </div>
    </nav>
      <h2>Exam Information</h2>
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
      </Table>
    </div>
  );
};

export default ExamsTable;
