// Api route for Data Structures and Algorithms (DSA's)
const express = require('express');

const router = express.Router();
const {
  getAllCourses,
  getCourse,
  getCourseTopics,
  getCourseTopic,
  getCourseSubTopics,
  getCourseSubTopic,
  createCourse,
  createCourseTopic,
  createCourseSubTopic,
  updateCourse,
  updateCourseTopic,
  updateCourseSubTopic,
  deleteCourse,
  deleteCourseTopic,
  deleteCourseSubTopic,
} = require('../controllers/courseController');
// Input validation middleware and schemas
const {
  courseSchema,
  courseTopicSchema,
  validateInputs,
} = require('../middlewares/validators/inputValidator');

// isAuthenticated and isAuthorized middlewares
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isAuthorized } = require('../middlewares/isAuthorized');

// Routes for GET requests
router.get('/', getAllCourses);
router.get('/:courseId', getCourse);
router.get('/:courseId/topics', getCourseTopics);
router.get('/:courseId/topics/:topicId', getCourseTopic);
router.get('/:courseId/topics/:topicId/subtopics', getCourseSubTopics);
router.get(
  '/:courseId/topics/:topicId/subtopics/:subtopicId',
  getCourseSubTopic
);

// Routes for POST requests
router.post(
  '/',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('POST', courseSchema),
  createCourse
);

router.post(
  '/:courseId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('POST', courseTopicSchema),
  createCourseTopic
);

router.post(
  '/:courseId/topics/:topicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('POST', courseTopicSchema),
  createCourseSubTopic
);

// Routes for PUT requests
router.put(
  '/:courseId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('PUT', courseSchema),
  updateCourse
);

router.put(
  '/:courseId/topics/:topicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('PUT', courseTopicSchema),
  updateCourseTopic
);

router.put(
  '/:courseId/topics/:topicId/subtopics/:subtopicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('PUT', courseTopicSchema),
  updateCourseSubTopic
);

// Routes for DELETE requests
router.delete(
  '/:courseId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteCourse
);

router.delete(
  '/:courseId/topics/:topicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteCourseTopic
);

router.delete(
  '/:courseId/topics/:topicId/subtopics/:subtopicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteCourseSubTopic
);

module.exports = router;
