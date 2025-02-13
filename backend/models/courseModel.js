// Models for Courses
const mongoose = require('mongoose');

// Course model
const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
  },
  { timestamps: true }
);
const Course = mongoose.model('Course', CourseSchema);

// Course Topics model
const CourseTopicSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    courseTopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseTopic' || null,
    },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  },
  { timestamps: true }
);

const CourseTopic = mongoose.model('CourseTopic', CourseTopicSchema);

module.exports = {
  Course,
  CourseTopic,
};
