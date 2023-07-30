import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Import your feature components
import CheckMarks from '../components/marks';
import CheckAttendance from '../components/attendance';
import WithdrawCourse from '../components/courseWithdrawal';
import PayFee from '../components/feePayment';
import BookLibraryRoom from '../components/libraryRoomBooking';
import CheckGrades from '../components/grades';
import BorrowBook from '../components/bookBorrowing';
import GiveFeedback from '../components/feedback';

const StudentPortalPage = () => {
  return (
    <Router>
      <div className="student-portal-page">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">Student Portal</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/check-marks" className="nav-link">Check Marks</Link>
                </li>
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
                  <Link to="/book-library-room" className="nav-link">Book Library Room</Link>
                </li>
                <li className="nav-item">
                  <Link to="/check-grades" className="nav-link">Check Grades</Link>
                </li>
                <li className="nav-item">
                  <Link to="/borrow-book" className="nav-link">Borrow Book</Link>
                </li>
                <li className="nav-item">
                  <Link to="/give-feedback" className="nav-link">Give Feedback</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-5">
          <div className="row">
            {/* Content for each feature will go here */}
          </div>
        </div>
      </div>
    </Router>
  );
};

export default StudentPortalPage;
