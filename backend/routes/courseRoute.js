// Api route for Courses
const router = require('express').Router();
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
  updateCourses,
  updateCourse,
  updateCourseTopics,
  updateCourseTopic,
  updateCourseSubTopics,
  updateCourseSubTopic,
  deleteCourses,
  deleteCourse,
  deleteCourseTopics,
  deleteCourseTopic,
  deleteCourseSubTopics,
  deleteCourseSubTopic,
} = require('../controllers/courseController');

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
router.post('/', createCourse);
router.post('/:courseId', createCourseTopic);
router.post('/:courseId/topics/:topicId', createCourseSubTopic);

// Routes for PUT requests
router.put('/', updateCourses);
router.put('/:courseId', updateCourse);
router.put('/:courseId/topics', updateCourseTopics);
router.put('/:courseId/topics/:topicId', updateCourseTopic);
router.put('/:courseId/topics/:topicId/subtopics', updateCourseSubTopics);
router.put(
  '/:courseId/topics/:topicId/subtopics/:subtopicId',
  updateCourseSubTopic
);

// Routes for DELETE requests
router.delete('/', deleteCourses);
router.delete('/:courseId', deleteCourse);
router.delete('/:courseId/topics', deleteCourseTopics);
router.delete('/:courseId/topics/:topicId', deleteCourseTopic);
router.delete('/:courseId/topics/:topicId/subtopics', deleteCourseSubTopics);
router.delete(
  '/:courseId/topics/:topicId/subtopics/:subtopicId',
  deleteCourseSubTopic
);

module.exports = router;
