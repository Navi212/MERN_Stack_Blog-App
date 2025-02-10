// Api route for Data Structures and Algorithms (DSA's)
const router = require('express').Router();
const {
  getAllDsas,
  getdsa,
  getdsaTopics,
  getdsaTopic,
  getdsaSubTopics,
  getdsaSubTopic,
  createDsa,
  createDsaTopic,
  createDsaSubTopic,
  updateDsas,
  updateDsa,
  updateDsaTopics,
  updateDsaTopic,
  updateDsaSubTopics,
  updateDsaSubTopic,
  deleteDsas,
  deleteDsa,
  deleteDsaTopics,
  deleteDsaTopic,
  deleteDsaSubTopics,
  deleteDsaSubTopic,
} = require('../controllers/dsaController');

// Routes for GET requests
router.get('/', getAllDsas);
router.get('/:dsaId', getdsa);
router.get('/:dsaId/topics', getdsaTopics);
router.get('/:dsaId/topics/:topicId', getdsaTopic);
router.get('/:dsaId/topics/:topicId/subtopics', getdsaSubTopics);
router.get('/:dsaId/topics/:topicId/subtopics/:subtopicId', getdsaSubTopic);

// Routes for POST requests
router.post('/', createDsa);
router.post('/:dsaId', createDsaTopic);
router.post('/:dsaId/topics/:topicId', createDsaSubTopic);

// Routes for PUT requests
router.put('/', updateDsas);
router.put('/:dsaId', updateDsa);
router.put('/:dsaId/topics', updateDsaTopics);
router.put('/:dsaId/topics/:topicId', updateDsaTopic);
router.put('/:dsaId/topics/:topicId/subtopics', updateDsaSubTopics);
router.put('/:dsaId/topics/:topicId/subtopics/:subtopicId', updateDsaSubTopic);

// Routes for DELETE requests
router.delete('/', deleteDsas);
router.delete('/:dsaId', deleteDsa);
router.delete('/:dsaId/topics', deleteDsaTopics);
router.delete('/:dsaId/topics/:topicId', deleteDsaTopic);
router.delete('/:dsaId/topics/:topicId/subtopics', deleteDsaSubTopics);
router.delete(
  '/:dsaId/topics/:topicId/subtopics/:subtopicId',
  deleteDsaSubTopic
);

module.exports = router;
