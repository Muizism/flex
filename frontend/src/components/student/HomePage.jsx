import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const HomePage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/student/:id');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Student Information</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Student Name</th>
            <th>Batch</th>
            <th>CGPA</th>
            <th>Semester</th>
            <th>Degree</th>
            <th>Section</th>
            <th>Status</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Guardian</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.rollNo}</td>
              <td>{student.studentName}</td>
              <td>{student.batch}</td>
              <td>{student.CGPA}</td>
              <td>{student.semester}</td>
              <td>{student.degree}</td>
              <td>{student.section}</td>
              <td>{student.status}</td>
              <td>{student.phone}</td>
              <td>{student.gender}</td>
              <td>{student.email}</td>
              <td>{student.guardian}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HomePage;
