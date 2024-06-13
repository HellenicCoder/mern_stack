const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route requiring authentication
router.get('/protected', authenticateToken, (req, res) => {
  // Access req.user to get user information
  res.json({ message: 'You are authorized to access this route', user: req.user });
});

module.exports = router;
