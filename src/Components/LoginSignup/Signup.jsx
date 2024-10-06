import React, { useState } from 'react';
import './LoginSignup.css';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');                // State for Name
  const [contact, setContact] = useState('');          // State for Contact
  const [email, setEmail] = useState('');              // State for Email
  const [password, setPassword] = useState('');        // State for Password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for Confirm Password
  const [error, setError] = useState('');              // State for Error Message
  const [success, setSuccess] = useState('');          // State for Success Message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate other fields
    if (!name || !contact || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Send name, contact, email, and password to the backend
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        contact,
        email,
        password
      });
      setSuccess(res.data.msg);
      setError('');  // Clear error message on success
    } catch (err) {
      // Handle error responses gracefully
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('An unexpected error occurred');
      }
      setSuccess('');  // Clear success message on error
    }
  };

  return (
    <div className="form-content signup p-1">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}                          // Controlled input for name
            onChange={(e) => setName(e.target.value)}  // Update name state
            required
          />
        </div>
        <div className="input-container">
          <label>Contact</label>
          <input
            type="text"  // Change to text to handle leading 0s in phone numbers
            placeholder="Enter your contact number"
            value={contact}                       // Controlled input for contact
            onChange={(e) => setContact(e.target.value)}  // Update contact state
            required
          />
        </div>
        <div className="input-container">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
        <button type="submit" className="submit-btn">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
