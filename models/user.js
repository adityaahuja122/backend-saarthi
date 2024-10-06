const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures that the name field must be provided
  },
  contact: {
    type: String,  // Using String to support numbers with leading 0s (like phone numbers)
    required: true, // Ensures that the contact field must be provided
    minlength: 10,  // Optional: enforce minimum length (adjust as needed)
    maxlength: 15,  // Optional: enforce maximum length (adjust as needed)
  },
  email: {
    type: String,
    required: true, // Ensures that the email field must be provided
    unique: true,    // Ensures that the email field is unique across all users
    lowercase: true, // Convert email to lowercase before saving
    trim: true,      // Trim whitespace from the email
  },
  password: {
    type: String,
    required: true, // Ensures that the password field must be provided
    minlength: 6,    // Optional: enforce minimum password length
  },
}, { timestamps: true }); // Automatically creates createdAt and updatedAt fields

module.exports = mongoose.model('User', UserSchema);
