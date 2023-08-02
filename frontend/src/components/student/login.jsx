import React, { useState } from 'react';

function Login() {
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
    try {
      // Your login logic here...
      // For simplicity, I'm just showing a success message after 2 seconds.
      setMessage('Successfully logged in! Redirecting...');

      setTimeout(() => {
        setMessage('');
        // Redirect to the home page or any other page after successful login
        // Replace '/home' with the URL path of your student home page component
        window.location.href = '/home';
      }, 2000); // Redirect after 2 seconds (you can adjust the delay as needed)

    } catch (error) {
      console.error('Something went wrong while logging in:', error);
      setMessage('An error occurred while logging in. Please check your username and password and try again.');
    }
  }

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
        {message && <div className="mt-3">{message}</div>}
      </form>
    </div>
  );
}

export default Login;
