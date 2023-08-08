import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
// import Cookies from 'js-cookie';

const Home = () => {
  const { academicId } = useParams();
  const [academicInfo, setAcademicInfo] = useState(null);

  useEffect(() => {
    const fetchAcademicInfo = async () => {
      try {
        // const token = localStorage.getItem('token'); 
        // const headers = {
        //   Authorization: `Bearer ${token}`
        // };
  
        // console.log('Sending request with token:', token);
  
        const response = await axios.get(`http://localhost:3001/academics/academics/${academicId}`);
  
        setAcademicInfo(response.data);
      } catch (error) {
        console.error('Error fetching academic info:', error);
      }
    };
  
    fetchAcademicInfo();
  }, [academicId, setAcademicInfo]);

  return (
    <div className="container mt-5">
  
         <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container">
          <Link to="/academic-home/:academicId" className="navbar-brand">Home</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/timetable" className="nav-link">Time Table</Link>
              </li>
              <li className="nav-item">
                <Link to="/register-course" className="nav-link">Register Course</Link>
              </li>
              <li className="nav-item">
                <Link to="/exam-schedule" className="nav-link">Exam Schedule</Link>
              </li>
              <li className="nav-item">
                <Link to="/drop-course" className="nav-link">Drop Course</Link>
              </li>
              <li className="nav-item">
                <Link to="/change-section" className="nav-link">Change Section</Link>
              </li>
        
            </ul>
          </div>
        </div>
      </nav>
      <h2 className="text-center">Welcome to the Home Page</h2>
      <div className="card mt-3">
        <div className="card-body">
          {academicInfo ? (
            <div>
              <p className="card-text">
                <strong>Name:</strong> {academicInfo.first_name} {academicInfo.last_name}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {academicInfo.email}
              </p>
            </div>
          ) : (
            <p>Loading academic information...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
