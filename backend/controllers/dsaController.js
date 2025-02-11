// Data Structures and Algorithm (DSA) controller
const { asyncHandler, AppError } = require('../services/errorHandler');
const { Dsa, DsaTopic } = require('../models/dsaModel');
const { paginationHelper } = require('../services/paginationHelper');

// Get all Dsas => /v1/api/dsas
exports.getAllDsas = asyncHandler(async (req, res, next) => {
  const { resultPerPage, skip } = paginationHelper(req);

  const dsas = await Dsa.find().limit(resultPerPage).skip(skip);

  if (!dsas || dsas.length === 0)
    return next(new AppError('No dsa found', 404));

  return res.status(200).json({ success: true, content: dsas });
});

// Get a specific Dsa => /v1/api/dsas/:dsaId
exports.getDsa = asyncHandler(async (req, res, next) => {
  const { dsaId } = req.params;

  if (!dsaId) return next(new AppError('Invalid dsaId', 400));

  const dsa = await Dsa.findById(dsaId);
  if (!dsa) return next(new AppError('No dsa found', 404));

  return res.status(200).json({ success: true, content: dsa });
});

// Get all Topics for a specific Dsa => /v1/api/dsas/:dsaId/topics
exports.getDsaTopics = asyncHandler(async (req, res, next) => {
  const { resultPerPage, skip } = paginationHelper(req);
  const { dsaId } = req.params;

  if (!dsaId) return next(new AppError('Invalid/No dsaId', 400));

  const topics = await DsaTopic.find({ dsaId }).limit(resultPerPage).skip(skip);
  if (!topics) return next(new AppError('No topics found', 404));

  return res.status(200).json({ success: true, content: topics });
});

// Get a Topic for a specific Dsa => /v1/api/dsas/:dsaId/topics/:topicId
exports.getDsaTopic = asyncHandler(async (req, res, next) => {
  const { dsaId, topicId } = req.params;

  if (!dsaId || !topicId)
    return next(new AppError('Invalid/No dsaId or topicId', 400));

  const topic = await DsaTopic.findOne({
    dsaId,
    dsaTopicId: topicId,
  });
  if (!topic) return next(new AppError('No topic found', 404));

  return res.status(200).json({ success: true, content: topic });
});

// Get all SubTopics for a Topic => /v1/api/dsas/:dsaId/topics/:topicId/subtopics
exports.getDsaSubTopics = asyncHandler(async (req, res, next) => {
  const { resultPerPage, skip } = paginationHelper(req);
  const { dsaId, topicId } = req.params;

  if (!dsaId || !topicId)
    return next(new AppError('Invalid dsaId or topicId', 400));

  const subTopics = await DsaTopic.find({
    dsaId,
    dsaTopicId: topicId,
  })
    .limit(resultPerPage)
    .skip(skip);
  if (!subTopics) return next(new AppError('No subtopics found', 404));

  return res.status(200).json({ success: true, content: subTopics });
});

// Get SubTopic for a Topic => /v1/api/dsas/:dsaId/topics/:topicId/subtopics/:subtopicId
// The :subtopicId is the DsaTopic _id which would be passed as the :subtopicId in the parameter
exports.getDsaSubTopic = asyncHandler(async (req, res, next) => {
  const { dsaId, topicId, subtopicId } = req.params;

  if (!dsaId || !topicId || !subtopicId)
    return next(new AppError('Invalid/No dsaId/topicId/subtopicId', 400));

  const subTopic = await DsaTopic.findOne({
    dsaId,
    dsaTopicId: topicId,
    _id: subtopicId,
  });
  if (!subTopic) return next(new AppError('No subtopic found', 404));

  return res.status(200).json({ success: true, content: subTopic });
});

// Create a Dsa => /v1/api/dsas
exports.createDsa = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description)
    return next(new AppError('Dsa name or description missing', 400));

  const dsa = await Dsa.create({ name, description });
  if (!dsa) return next(new AppError('Error occured creating Dsa', 500));

  return res.status(201).json({ success: true, message: 'Dsa created' });
});

// Create a Topic of an existing Dsa => /v1/api/dsas/:dsaId
exports.createDsaTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { dsaId } = req.params;

  if (!name || !description || !content)
    return next(
      new AppError('Dsa topic name/description/content missing', 400)
    );

  const existsDsa = await Dsa.findById(dsaId);
  if (!existsDsa) return next(new AppError('Dsa does not exist', 404));

  const dsaTopic = await DsaTopic.create({
    name,
    description,
    content,
    dsaId,
  });
  if (!dsaTopic)
    return next(new AppError('Error occured creating dsa topic', 500));

  return res.status(201).json({ success: true, message: 'Dsa topic created' });
});

// Create a subtopic for a dsa topic => /v1/api/dsas/:dsaId/topics/:topicId
exports.createDsaSubTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { dsaId, topicId } = req.params;

  if (!name || !description || !content)
    return next(
      new AppError('Dsa subtopic name/description/content missing', 400)
    );

  const existsDsa = await Dsa.findById(dsaId);
  const existsDsaTopic = await DsaTopic.findById(topicId);
  if (!existsDsa || !existsDsaTopic)
    return next(new AppError('Dsa or Topic does not exist', 404));

  const subTopic = await DsaTopic.create({
    name,
    description,
    content,
    dsaTopicId: topicId,
    dsaId,
  });
  if (!subTopic)
    return next(new AppError('Error occured creating dsa subtopic', 500));

  return res
    .status(201)
    .json({ success: true, message: 'Dsa subtopic created' });
});

// Update a specific dsa => /v1/api/dsas/:dsaId
exports.updateDsa = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  const { dsaId } = req.params;

  if (!dsaId) return next(new AppError('Invalid/No dsaId', 400));

  const updatedDsa = await Dsa.findByIdAndUpdate(dsaId, {
    name,
    description,
  });
  if (!updatedDsa) return next(new AppError('Error occured updating Dsa', 500));

  return res.status(200).json({ success: true, message: 'Dsa updated' });
});

// Update a specific dsa topic => /v1/api/dsas/:dsaId/topics/:topicId
exports.updateDsaTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { dsaId, topicId } = req.params;

  if (!dsaId || !topicId)
    return next(new AppError('Invalid/No dsaId/topicId', 400));

  const dsa = await Dsa.findById(dsaId);
  if (!dsa) return next(new AppError('No dsa found', 404));

  const updatedTopic = await DsaTopic.findByIdAndUpdate(
    { _id: topicId },
    { name, description, content }
  );
  if (!updatedTopic)
    return next(new AppError('Error occured updating Topic', 500));

  return res.status(200).json({ success: true, message: 'Topic updated' });
});

// Update a specific dsa subtopic => /v1/api/dsas/:dsaId/topics/:topicId/subtopics/:subtopicId
exports.updateDsaSubTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { dsaId, topicId, subtopicId } = req.params;

  if (!dsaId || !topicId || !subtopicId)
    return next(new AppError('Invalid dsaId/topicId/subtopicId', 400));

  const dsa = await Dsa.findById(dsaId);
  const topic = await DsaTopic.findById(topicId);
  if (!dsa && !topic) return next(new AppError('No dsa and topic found', 404));

  const updatedSubTopic = await DsaTopic.findByIdAndUpdate(subtopicId, {
    name,
    description,
    content,
  });
  if (!updatedSubTopic)
    return next(new AppError('Error occured updating SubTopic', 500));

  return res.status(200).json({ success: true, message: 'SubTopic updated' });
});

// Delete a single Dsa => /v1/api/dsas/:dsaId
exports.deleteDsa = asyncHandler(async (req, res, next) => {
  const { dsaId } = req.params;

  if (!dsaId) return next(new AppError('Invalid dsaId', 400));

  const deletedDsa = await Dsa.findByIdAndDelete(dsaId);
  if (!deletedDsa) return next(new AppError('Error occured deleting Dsa', 500));

  return res.status(200).json({ success: true, message: 'Dsa deleted' });
});

// Delete a single Topic => /v1/api/dsas/:dsaId/topics/:topicId
exports.deleteDsaTopic = asyncHandler(async (req, res, next) => {
  const { dsaId, topicId } = req.params;

  if (!dsaId || !topicId)
    return next(new AppError('Invalid dsaId/topicId', 400));

  const dsa = await Dsa.findById(dsaId);
  if (!dsa) return next(new AppError('No dsa found', 404));

  const deletedTopic = await DsaTopic.findByIdAndDelete(topicId);
  if (!deletedTopic)
    return next(new AppError('Error occured deleting Topic', 500));

  return res.status(200).json({ success: true, message: 'Topic deleted' });
});

// Delete a single SubTopic => /v1/api/dsas/:dsaId/topics/:topicId/subtopics/:subtopicId
exports.deleteDsaSubTopic = asyncHandler(async (req, res, next) => {
  const { dsaId, topicId, subtopicId } = req.params;

  if (!dsaId || !topicId || !subtopicId)
    return next(new AppError('Invalid dsaId/topicId/subtopicId', 400));

  const dsa = await Dsa.findById(dsaId);
  const topic = await DsaTopic.findById(topicId);
  if (!dsa && !topic) return next(new AppError('No dsa and topic found', 404));

  const deletedTopic = await DsaTopic.findByIdAndDelete(subtopicId);
  if (!deletedTopic)
    return next(new AppError('Error occured deleting Topic', 500));

  return res.status(200).json({ success: true, message: 'Subtopic deleted' });
});
