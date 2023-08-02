import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap'; // Import the Navbar component
import axios from 'axios';

const CheckGrades = () => {
  const [gradesData, setGradesData] = useState([]);

  useEffect(() => {
    fetchGradesData();
  }, []);

  const fetchGradesData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/students/check-grades');
      setGradesData(response.data);
    } catch (error) {
      console.error('Error fetching grades data:', error);
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
            <Nav.Link href="/check-grades">Check Grades</Nav.Link>
            {/* Add other navigation links here */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Check Grades Content */}
      <div className="container mt-4">
        <h2>Check Grades</h2>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Assignment Marks</th>
              <th>Quiz Marks</th>
              <th>Midterm Marks</th>
              <th>Final Marks</th>
            </tr>
          </thead>
          <tbody>
            {gradesData.map((grade) => (
              <tr key={grade._id}>
                <td>{grade.course_id}</td>
                <td>{grade.assignment_marks}</td>
                <td>{grade.quiz_marks}</td>
                <td>{grade.midterm_marks}</td>
                <td>{grade.final_marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckGrades;
