import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import image from './logo.png';

const TimetablePage = () => {
  const [timetable, setTimetable] = useState([]);
  const [formData, setFormData] = useState({
    department: '',
    courseName: '',
    section: '',
    date: '',
    time: '',
  });
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const response = await axios.get('http://localhost:3001/academics/view-table');
      setTimetable(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/academics/timetable', formData);
      fetchTimetable();
      clearForm();
      toast.success('Timetable entry created successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error creating timetable entry');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/academics/timetable/${id}`);
      fetchTimetable();
      toast.success('Timetable entry deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error deleting timetable entry');
    }
  };

  const clearForm = () => {
    setFormData({
      department: '',
      courseName: '',
      section: '',
      date: '',
      time: '',
    });
  };

  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    setFormData({
      department: entry.department,
      courseName: entry.courseName,
      section: entry.section,
      date: entry.date,
      time: entry.time,
    });
  };

 
  const handleUpdate = async (e) => {
    e.preventDefault(); 
 
    try {
      await axios.put(`http://localhost:3001/academics/timetable/${selectedEntry._id}`, formData);
      fetchTimetable();
      clearForm();
      setSelectedEntry(null);
      toast.success('Timetable entry updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error updating timetable entry');
    }
  };

  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-light bg-light gradient-background">
        <div className="container">
        <Link to={`/academic-home/${localStorage.getItem('userId')}`} className="navbar-brand">
            <img src={image} alt="Logo" width="150" height="150" />
          </Link>
          <div className="ml-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/change-section" className="nav-link white-bold">Change Section</Link>
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
                <button className="btn btn-danger">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  <div className="row" >
    <div className="col-md-6">
      <h2>{selectedEntry ? 'Edit Timetable Entry' : 'Create Timetable Entry'}</h2>
      <form onSubmit={selectedEntry ? handleUpdate : handleCreate}>
        <div className="form-group">
          <label>Department</label>
          <input type="text" name="department" className="form-control" value={formData.department} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Course Name</label>
          <input type="text" name="courseName" className="form-control" value={formData.courseName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Section</label>
          <input type="text" name="section" className="form-control" value={formData.section} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="text" name="date" className="form-control" value={formData.date} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input type="text" name="time" className="form-control" value={formData.time} onChange={handleInputChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          {selectedEntry ? 'Update Entry' : 'Create Entry'}
        </button>
        {selectedEntry && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setSelectedEntry(null);
              clearForm();
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
    <div className="col-md-6">
      <h2>View Timetable</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Department</th>
            <th>Course Name</th>
            <th>Section</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.department}</td>
              <td>{entry.courseName}</td>
              <td>{entry.section}</td>
              <td>{entry.date}</td>
              <td>{entry.time}</td>
              <td>
                <button onClick={() => handleEdit(entry)} className="btn btn-primary">Edit</button>
                <button onClick={() => handleDelete(entry._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
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

export default TimetablePage;
