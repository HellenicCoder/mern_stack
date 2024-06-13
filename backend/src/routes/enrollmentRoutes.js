const express = require('express');
const Enrollment = require('../models/Enrollment');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Enroll a user in a course
router.post('/enroll', authenticateToken, async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const newEnrollment = await Enrollment.create({ userId, courseId });

    res.status(201).json(newEnrollment);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Get enrolled courses for a user
router.get('/users/:userId/enrollments', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const enrollments = await Enrollment.find({ userId }).populate('courseId');

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Update enrollment progress
router.put('/enrollments/:enrollmentId', authenticateToken, async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { progress } = req.body;

    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { progress },
      { new: true }
    );

    res.json(updatedEnrollment);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
