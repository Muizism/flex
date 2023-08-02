import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap'; // Import the Navbar component
import axios from 'axios';

const CheckAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/students/check-attendance');
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  return (
    <div>
      {/* Bootstrap Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Student Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/check-attendance">Check Attendance</Nav.Link>
            {/* Add other navigation links here */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Check Attendance Content */}
      <div className="container mt-4">
        <h2>Check Attendance</h2>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((attendance) => (
              <tr key={attendance._id}>
                <td>{attendance.course_id}</td>
                <td>{attendance.date}</td>
                <td>{attendance.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckAttendance;
