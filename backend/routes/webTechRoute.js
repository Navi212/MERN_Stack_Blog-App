// Api route for Web technologies
const router = require('express').Router();
const {
  getAllWebTechs,
  getWebTech,
  getWebTechTopics,
  getWebTechTopic,
  getWebTechSubTopics,
  getWebTechSubTopic,
  createWebTech,
  createWebTechTopic,
  createWebTechSubTopic,
  updateWebTech,
  updateWebTechTopic,
  updateWebTechSubTopic,
  deleteWebTech,
  deleteWebTechTopic,
  deleteWebTechSubTopic,
} = require('../controllers/webTechController');

// Input validation middleware and schemas
const {
  webTechSchema,
  webTechTopicSchema,
  validateInputs,
} = require('../middlewares/validators/inputValidator');

// isAuthenticated and isAuthorized middlewares
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isAuthorized } = require('../middlewares/isAuthorized');

// Routes for GET requests
router.get('/', getAllWebTechs);
router.get('/:webtechId', getWebTech);
router.get('/:webtechId/topics', getWebTechTopics);
router.get('/:webtechId/topics/:topicId', getWebTechTopic);
router.get('/:webtechId/topics/:topicId/subtopics', getWebTechSubTopics);
router.get(
  '/:webtechId/topics/:topicId/subtopics/:subtopicId',
  getWebTechSubTopic
);

// Routes for POST requests
router.post(
  '/',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('POST', webTechSchema),
  createWebTech
);

router.post(
  '/:webtechId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('POST', webTechTopicSchema),
  createWebTechTopic
);

router.post(
  '/:webtechId/topics/:topicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('POST', webTechTopicSchema),
  createWebTechSubTopic
);

// Routes for PUT requests
router.put(
  '/:webtechId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('PUT', webTechSchema),
  updateWebTech
);

router.put(
  '/:webtechId/topics/:topicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('PUT', webTechTopicSchema),
  updateWebTechTopic
);

router.put(
  '/:webtechId/topics/:topicId/subtopics/:subtopicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('PUT', webTechTopicSchema),
  updateWebTechSubTopic
);

// Routes for DELETE requests
router.delete(
  '/:webtechId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteWebTech
);

router.delete(
  '/:webtechId/topics/:topicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteWebTechTopic
);

router.delete(
  '/:webtechId/topics/:topicId/subtopics/:subtopicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteWebTechSubTopic
);

module.exports = router;
