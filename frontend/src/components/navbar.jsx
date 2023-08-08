import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ academicId }) => {
  return (
    <nav className="navbar navbar-mainbg fixed-top">
      <div className="container nav-container">
        <Link to={`/academic-home/${academicId}`} className="navbar-brand nav-logo">Home</Link>
        <button className="navbar-toggler nav-icon" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto nav-menu">
            <li className="nav-item">
              <Link to="/timetable" className="nav-link nav-links">Time Table</Link>
            </li>
            <li className="nav-item">
              <Link to="/register-course" className="nav-link nav-links">Register Course</Link>
            </li>
            <li className="nav-item">
              <Link to="/exam-schedule" className="nav-link nav-links">Exam Schedule</Link>
            </li>
            <li className="nav-item">
              <Link to="/drop-course" className="nav-link nav-links">Drop Course</Link>
            </li>
            <li className="nav-item">
              <Link to="/change-section" className="nav-link nav-links">Change Section</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
