import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Timetable = () => {
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get('http://localhost:3001/students/show-table');
        setTimetableData(response.data);
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };

    fetchTimetable();
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
              <Link to="/show-exam" className="nav-link">Show Exams</Link>
            </li>
            <li className="nav-item">
              <Link to="/payment" className="nav-link">Pay Fee</Link>
            </li>
            

            
            {/* Add other routes/buttons as needed */}
          </ul>
        </div>
      </div>
    </nav>
      <h2>Timetable</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Department</th>
            <th>Course Name</th>
            <th>Section</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {timetableData.map((item) => (
            <tr key={item._id}>
              <td>{item.department}</td>
              <td>{item.courseName}</td>
              <td>{item.section}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Timetable;
