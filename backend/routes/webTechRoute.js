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
  createwebTechTopic,
  createwebTechSubTopic,
  updateWebTechs,
  updateWebTech,
  updateWebTechTopics,
  updateWebTechTopic,
  updateWebTechSubTopics,
  updateWebTechSubTopic,
  deleteWebTechs,
  deleteWebTech,
  deleteWebTechTopics,
  deleteWebTechTopic,
  deleteWebTechSubTopics,
  deleteWebTechSubTopic,
} = require('../controllers/webTechController');

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
router.post('/', createWebTech);
router.post('/:webtechId', createwebTechTopic);
router.post('/:webtechId/topics/:topicId', createwebTechSubTopic);

// Routes for PUT requests
router.put('/', updateWebTechs);
router.put('/:webtechId', updateWebTech);
router.put('/:webtechId/topics', updateWebTechTopics);
router.put('/:webtechId/topics/:topicId', updateWebTechTopic);
router.put('/:webtechId/topics/:topicId/subtopics', updateWebTechSubTopics);
router.put(
  '/:webtechId/topics/:topicId/subtopics/:subtopicId',
  updateWebTechSubTopic
);

// Routes for DELETE requests
router.delete('/', deleteWebTechs);
router.delete('/:webtechId', deleteWebTech);
router.delete('/:webtechId/topics', deleteWebTechTopics);
router.delete('/:webtechId/topics/:topicId', deleteWebTechTopic);
router.delete('/:webtechId/topics/:topicId/subtopics', deleteWebTechSubTopics);
router.delete(
  '/:webtechId/topics/:topicId/subtopics/:subtopicId',
  deleteWebTechSubTopic
);

module.exports = router;
