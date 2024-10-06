import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setSuccess(res.data.msg);
      setError('');

      // Save user data in localStorage
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Login Error:', err); // Log the error for debugging
      setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
      setSuccess('');
    }
  };

  return (
    <div className="form-content">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
