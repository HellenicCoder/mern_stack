const express = require('express');
const CourseContent = require('../models/CourseContent');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Add content to a course
router.post('/courses/:courseId/content', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, contentType, contentData, order } = req.body;

    // Validate required fields
    if (!title || !description || !contentType || !contentData || order === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContent = new CourseContent({
      title,
      description,
      contentType,
      contentData,
      order,
      course: courseId
    });

    await newContent.save();
    res.status(201).json({ message: 'Content added successfully', content: newContent });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
