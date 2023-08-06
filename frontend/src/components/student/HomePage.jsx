import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { studentId } = useParams();
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/students/students/${studentId}`);
        setStudentInfo(response.data);
      } catch (error) {
        console.error('Error fetching academic info:', error);
      }
    };


    fetchStudentInfo();
  }, [studentId, setStudentInfo]); 

  return (
    <div className="container mt-5">
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
              <Link to="/show-exam" className="nav-link">Show Exams</Link>
            </li>
            <li className="nav-item">
              <Link to="/show-table" className="nav-link">Show Timetable</Link>
            </li>
            {/* Add other routes/buttons as needed */}
          </ul>
        </div>
      </div>
    </nav>
    <h2 className="text-center">Welcome to the Home Page</h2>
    <div className="card mt-3">
      <div className="card-body">
        {studentInfo ? (
          <div>
            <p className="card-text">
              <strong>Roll Number:</strong> {studentInfo.rollNo}
            </p>
            <p className="card-text">
              <strong>Name:</strong> {studentInfo.studentName}
            </p>
            <p className="card-text">
              <strong>Batch:</strong> {studentInfo.batch}
            </p>
            <p className="card-text">
              <strong>CGPA:</strong> {studentInfo.CGPA}
            </p>
            <p className="card-text">
              <strong>Semester:</strong> {studentInfo.semester}
            </p>
            <p className="card-text">
              <strong>Degree:</strong> {studentInfo.degree}
            </p>
            <p className="card-text">
              <strong>Section:</strong> {studentInfo.section}
            </p>
            <p className="card-text">
              <strong>Status:</strong> {studentInfo.status}
            </p>
            <p className="card-text">
              <strong>Phone:</strong> {studentInfo.phone}
            </p>
            <p className="card-text">
              <strong>Gender:</strong> {studentInfo.gender}
            </p>
            <p className="card-text">
              <strong>Email:</strong> {studentInfo.email}
            </p>
            <p className="card-text">
              <strong>Guardian:</strong> {studentInfo.guardian}
            </p>
          </div>
        ) : (
          <p>Loading student information...</p>
        )}
      </div>
    </div>
  </div>
  
);
};

export default HomePage;
