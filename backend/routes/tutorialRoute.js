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
  // updateTutorials,
  updateTutorial,
  // updateTutorialTopics,
  updateTutorialTopic,
  // updateTutorialSubTopics,
  updateTutorialSubTopic,
  // deleteTutorials,
  deleteTutorial,
  // deleteTutorialTopics,
  deleteTutorialTopic,
  // deleteTutorialSubTopics,
  deleteTutorialSubTopic,
} = require('../controllers/tutorialController');

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
  isAuthorized(['SuperAdmin', 'Admin']),
  createTutorial
);
router.post(
  '/:tutorialId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  createTutorialTopic
);
router.post(
  '/:tutorialId/topics/:topicId',
  isAuthenticated,
  createTutorialSubTopic
);

// Routes for PUT requests
// router.put('/', updateTutorials); // Cannot update all Tutorials at once
router.put(
  '/:tutorialId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  updateTutorial
);
// router.put('/:tutorialId/topics', updateTutorialTopics); // Cannot update all Topics at once
router.put(
  '/:tutorialId/topics/:topicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  updateTutorialTopic
);
// router.put('/:tutorialId/topics/:topicId/subtopics', updateTutorialSubTopics); // Cannot update all SubTopics at once
router.put(
  '/:tutorialId/topics/:topicId/subtopics/:subtopicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  updateTutorialSubTopic
);

// Routes for DELETE requests
// router.delete('/', deleteTutorials); // Cannot update all Tutorials at once
router.delete(
  '/:tutorialId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteTutorial
);
// router.delete('/:tutorialId/topics', deleteTutorialTopics); // Cannot update all Topics at once
router.delete(
  '/:tutorialId/topics/:topicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteTutorialTopic
);
// router.delete(
//   '/:tutorialId/topics/:topicId/subtopics',
//   deleteTutorialSubTopics
// );
router.delete(
  '/:tutorialId/topics/:topicId/subtopics/:subtopicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteTutorialSubTopic
);

module.exports = router;
