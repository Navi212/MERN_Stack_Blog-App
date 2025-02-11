// Api route for Data Structures and Algorithms (DSA's)
const express = require('express');

const router = express.Router();
const {
  getAllDsas,
  getDsa,
  getDsaTopics,
  getDsaTopic,
  getDsaSubTopics,
  getDsaSubTopic,
  createDsa,
  createDsaTopic,
  createDsaSubTopic,
  updateDsa,
  updateDsaTopic,
  updateDsaSubTopic,
  deleteDsa,
  deleteDsaTopic,
  deleteDsaSubTopic,
} = require('../controllers/dsaController');

// isAuthenticated and isAuthorized middlewares
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isAuthorized } = require('../middlewares/isAuthorized');

// Routes for GET requests
router.get('/', getAllDsas);
router.get('/:dsaId', getDsa);
router.get('/:dsaId/topics', getDsaTopics);
router.get('/:dsaId/topics/:topicId', getDsaTopic);
router.get('/:dsaId/topics/:topicId/subtopics', getDsaSubTopics);
router.get('/:dsaId/topics/:topicId/subtopics/:subtopicId', getDsaSubTopic);

// Routes for POST requests
router.post(
  '/',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  createDsa
);

router.post(
  '/:dsaId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  createDsaTopic
);

router.post(
  '/:dsaId/topics/:topicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  createDsaSubTopic
);

// Routes for PUT requests
router.put(
  '/:dsaId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  updateDsa
);

router.put(
  '/:dsaId/topics/:topicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  updateDsaTopic
);

router.put(
  '/:dsaId/topics/:topicId/subtopics/:subtopicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  updateDsaSubTopic
);

// Routes for DELETE requests
router.delete(
  '/:dsaId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteDsa
);

router.delete(
  '/:dsaId/topics/:topicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteDsaTopic
);

router.delete(
  '/:dsaId/topics/:topicId/subtopics/:subtopicId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteDsaSubTopic
);

module.exports = router;
