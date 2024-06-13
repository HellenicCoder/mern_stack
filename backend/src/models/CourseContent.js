const mongoose = require('mongoose');

const courseContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  contentType: { type: String, enum: ['lecture', 'quiz', 'assignment', 'resource'], required: true },
  contentData: { type: String, required: true },
  order: { type: Number, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
});

const CourseContent = mongoose.model('CourseContent', courseContentSchema);
module.exports = CourseContent;
