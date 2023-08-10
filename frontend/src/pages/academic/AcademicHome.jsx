import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link, useNavigate  } from 'react-router-dom';
import './styles.css';
import image from './logo.png';

const Home = () => {

  console.log("----->",localStorage.getItem('Atoken'));

  const { academicId } = useParams();
  const [academicInfo, setAcademicInfo] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    const fetchAcademicInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/academics/academics/${academicId}`);
        setAcademicInfo(response.data);
      } catch (error) {
        console.error('Error fetching academic info:', error);
      }
    };
  
    fetchAcademicInfo();
  }, [academicId, setAcademicInfo]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light gradient-background">
        <div className="container">
          <Link to="/academic-home/:academicId" className="navbar-brand">
            <img src={image} alt="Logo" width="150" height="150" />
          </Link>
          <div className="ml-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/timetable" className="nav-link white-bold">Time Table</Link>
              </li>
              <li className="nav-item">
                <Link to="/register-course" className="nav-link white-bold">Register Course</Link>
              </li>
              <li className="nav-item">
                <Link to="/exam-schedule" className="nav-link white-bold">Exam Schedule</Link>
              </li>
              <li className="nav-item">
                <Link to="/drop-course" className="nav-link white-bold">Drop Course</Link>
              </li>
              <li className="nav-item">
                <Link to="/change-section" className="nav-link white-bold">Change Section</Link>
              </li>
              <li className="nav-item">
              <button className="btn btn-danger" onClick={()=>{
                  localStorage.removeItem("Atoken");
                  localStorage.removeItem("AuserId")
                  navigate("/academic-login");
                }}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="welcome-card">
        <h2 className="text-center">Welcome to the Home Page</h2>
      </div>
      <div className="container mt-4">
        <div className="profile-card">
          <div className="card-body">
            <div className="profile-info">
              <img src={image} alt="Profile" className="profile-image" />
              {academicInfo ? (
                <div>
                  <h3>{academicInfo.first_name} {academicInfo.last_name}</h3>
                  <p>{academicInfo.email}</p>
                </div>
              ) : (
                <p>Loading academic information...</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer>
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

export default Home;
