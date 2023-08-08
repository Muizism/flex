import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields.'); // Show error toast for validation
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/students/login', formData);
      console.log(response.data);
      localStorage.setItem('userId', response.data.user._id);
      setMessage('Successfully logged in!');
      toast.success('Login successful'); // Show success toast on successful login

      navigate(`/home/${response.data.user._id}`);
    } catch (error) {
      console.error('Something went wrong while logging in:', error);
      setMessage('An error occurred while logging in. Please check your username and password and try again.');
      toast.error('An error occurred while logging in.'); // Show error toast on login error
    }
  }

  return (
    <div className="container-fluid vh-100 bg-secondary d-flex align-items-center justify-content-center">
      <div className="card shadow-lg" style={{ backgroundColor: '#f0f0f0' }}>
        <div className="card-body p-4">
          <h4 className="card-title mb-4">Student Login</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" name="email" onChange={handleChange} className="form-control" placeholder="Email" required minLength="3" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" onChange={handleChange} className="form-control" placeholder="Password" required minLength="8" />
            </div>
            <br />
            <button type="submit" className="btn btn-primary btn-block">Log In</button>
            {message && <div className="mt-3 text-center">{message}</div>}
            <p className="mt-3 text-center text-secondary">Don't have an account? <Link to="/signup">Sign up</Link></p>
          </form>
        </div>
      </div>
      <ToastContainer /> {/* React-Toastify container */}
    </div>
  );
}

export default Login;
