import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const StudentHome = () => {
  // Replace this with the actual student information fetched from the backend
  const studentInfo = {
    rollNo: '2023001',
    studentName: 'John Doe',
    batch: '2023',
    CGPA: 3.8,
    semester: 5,
    degree: 'Computer Science',
    section: 'A',
    status: 'Active',
    phone: '1234567890',
    gender: 'Male',
    email: 'john.doe@example.com',
    address: {
      city: 'City',
      country: 'Country',
      homePhone: '9876543210',
      home: '123 Main Street',
    },
    guardian: 'Father',
  };

  return (
    <div>
      {/* Bootstrap Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Student Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/check-marks">Check Marks</Nav.Link>
            <Nav.Link href="/check-attendance">Check Attendance</Nav.Link>
            {/* Add other navigation links here */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Student Information Display */}
      <div className="container mt-4">
        <h2>Welcome, {studentInfo.studentName}!</h2>
        <p>Roll No: {studentInfo.rollNo}</p>
        <p>Batch: {studentInfo.batch}</p>
        {/* Add other student information here */}
      </div>
    </div>
  );
};

export default StudentHome;
