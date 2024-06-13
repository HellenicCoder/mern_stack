const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Get user profile
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from authenticated token
    const user = await User.findById(userId);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Update user profile
router.put('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from authenticated token
    const { username, email, password } = req.body;

    // Find user by ID
    const user = await User.findById(userId);

    // Update user profile fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save updated user profile
    await user.save();

    res.json({ message: 'User profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Delete user profile
router.delete('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from authenticated token
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
