import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './studentstyles.css';
import image from './logo.png';

const HomePage = () => {
  const { studentId } = useParams();
  const [studentInfo, setStudentInfo] = useState(null);
  const navigate=useNavigate();
  const handleLogout = () => {
    console.log("btn clicked");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    axios.get("http://localhost:3001/logout").then((response) => {
  })};
  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/students/students/${studentId}`,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        setStudentInfo(response.data);
      } catch (error) {
        console.error('Error fetching academic info:', error);
      }
    };

    fetchStudentInfo();
  }, [studentId, setStudentInfo]);

  return (
    <div className='body'>
      <nav className="navbar navbar-expand-lg  ">
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
                <Link to="/withdraw-course" className="nav-link white-bold">Withdraw Course</Link>
              </li>
              <li className="nav-item">
                <Link to="/feedback" className="nav-link white-bold">Feedback</Link>
              </li>
              <li className="nav-item">
                <Link to="/payment" className="nav-link white-bold">Pay Fee</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="welcome-card">
        <h2 className="text-center">Welcome to the Student Home Page</h2>
      </div>
      <div className="container mt-4">
        <div className="profile-card">
          <div className="card-body">
            <div className="profile-info">
              <img src={image} alt="Profile" className="profile-image" />
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
      </div>
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

export default HomePage;
