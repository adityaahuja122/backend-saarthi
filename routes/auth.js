const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  console.log(req.body); // Log the request body to debug

  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    res.json({ msg: 'Login successful', user: { id: user._id, name: user.name, email: user.email } }); // Return limited user info
  } catch (err) {
    console.error('Login error:', err); // Log error for debugging
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  const { name, contact, email, password } = req.body;

  // Validate request body
  if (!name || !contact || !email || !password) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      contact,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err); // Log error for debugging
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
