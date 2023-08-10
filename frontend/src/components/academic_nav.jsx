import React from 'react';
import { Link } from 'react-router-dom';
// import './academic_nav.css';

const Navbar = () => {
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

};

export default Navbar;
