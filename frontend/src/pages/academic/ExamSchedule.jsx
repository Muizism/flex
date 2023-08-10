import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import image from './logo.png';
import './styles.css';
const ExamSchedulePage = () => {
  const [examSchedule, setExamSchedule] = useState([]);
  const [formData, setFormData] = useState({
    examName: '',
    date: '',
    time: '',
    venue: '',
  });
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    fetchExamSchedule();
  }, []);

  const fetchExamSchedule = async () => {
    try {
      const response = await axios.get('http://localhost:3001/academics/view-exam-schedule');
      setExamSchedule(response.data);
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
      await axios.post('http://localhost:3001/academics/create-exam-schedule', formData);
      fetchExamSchedule();
      clearForm();
      toast.success('Exam schedule entry created successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error creating exam schedule entry');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/academics/delete-exam-schedule/${id}`);
      fetchExamSchedule();
      toast.success('Exam schedule entry deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error deleting exam schedule entry');
    }
  };

  const clearForm = () => {
    setFormData({
      examName: '',
      date: '',
      time: '',
      venue: '',
    });
  };

  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    setFormData({
      examName: entry.examName,
      date: entry.date,
      time: entry.time,
      venue: entry.venue,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/academics/update-exam-schedule/${selectedEntry._id}`, formData);
      fetchExamSchedule();
      clearForm();
      setSelectedEntry(null);
      toast.success('Exam schedule entry updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error updating exam schedule entry');
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
                <Link to="/timetable" className="nav-link white-bold">Time Table</Link>
              </li>
              <li className="nav-item">
                <Link to="/register-course" className="nav-link white-bold">Register Course</Link>
              </li>
              <li className="nav-item">
                <Link to="/drop-course" className="nav-link white-bold">Drop course</Link>
              </li>
              <li className="nav-item">
                <Link to="/change-section" className="nav-link white-bold">Change Section</Link>
              </li>
             
              <li className="nav-item">
                <button className="btn btn-danger">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="row">
       
        <div className="col-md-6">
          <h2>{selectedEntry ? 'Edit Exam Schedule Entry' : 'Create Exam Schedule Entry'}</h2>
          <form onSubmit={selectedEntry ? handleUpdate : handleCreate}>
          <div className="form-group">
          <label>Exam Name</label>
          <input type="text" name="examName" className="form-control" value={formData.examName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="text" name="date" className="form-control" value={formData.date} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input type="text" name="time" className="form-control" value={formData.time} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Venue</label>
          <input type="text" name="venue" className="form-control" value={formData.venue} onChange={handleInputChange} />
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
          <h2>View Exam Schedule</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Exam Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Venue</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {examSchedule.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.examName}</td>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                  <td>{entry.venue}</td>
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

export default ExamSchedulePage;
