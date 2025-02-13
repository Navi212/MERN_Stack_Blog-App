// Api route for Data Structures and Algorithms (DSA's)
const express = require('express');

const router = express.Router();
const {
  getAllTutorials,
  getTutorial,
  getTutorialTopics,
  getTutorialTopic,
  getTutorialSubTopics,
  getTutorialSubTopic,
  createTutorial,
  createTutorialTopic,
  createTutorialSubTopic,
  updateTutorial,
  updateTutorialTopic,
  updateTutorialSubTopic,
  deleteTutorial,
  deleteTutorialTopic,
  deleteTutorialSubTopic,
} = require('../controllers/tutorialController');

// Input validation middleware and schemas
const {
  tutorialSchema,
  tutorialTopicSchema,
  validateInputs,
} = require('../middlewares/validators/inputValidator');

// isAuthenticated and isAuthorized middlewares
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isAuthorized } = require('../middlewares/isAuthorized');

// Routes for GET requests
router.get('/', getAllTutorials);
router.get('/:tutorialId', getTutorial);
router.get('/:tutorialId/topics', getTutorialTopics);
router.get('/:tutorialId/topics/:topicId', getTutorialTopic);
router.get('/:tutorialId/topics/:topicId/subtopics', getTutorialSubTopics);
router.get(
  '/:tutorialId/topics/:topicId/subtopics/:subtopicId',
  getTutorialSubTopic
);

// Routes for POST requests
router.post(
  '/',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('POST', tutorialSchema),
  createTutorial
);

router.post(
  '/:tutorialId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('POST', tutorialTopicSchema),
  createTutorialTopic
);

router.post(
  '/:tutorialId/topics/:topicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('POST', tutorialTopicSchema),
  createTutorialSubTopic
);

// Routes for PUT requests
router.put(
  '/:tutorialId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('PUT', tutorialSchema),
  updateTutorial
);

router.put(
  '/:tutorialId/topics/:topicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('PUT', tutorialTopicSchema),
  updateTutorialTopic
);

router.put(
  '/:tutorialId/topics/:topicId/subtopics/:subtopicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  validateInputs('PUT', tutorialTopicSchema),
  updateTutorialSubTopic
);

// Routes for DELETE requests
router.delete(
  '/:tutorialId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteTutorial
);

router.delete(
  '/:tutorialId/topics/:topicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteTutorialTopic
);

router.delete(
  '/:tutorialId/topics/:topicId/subtopics/:subtopicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteTutorialSubTopic
);

module.exports = router;
