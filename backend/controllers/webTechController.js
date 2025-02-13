// Web Technologies controller
const { asyncHandler, AppError } = require('../services/errorHandler');
const { isValidObjectId } = require('../services/validateMongoObjectId');
const { WebTech, WebTechTopic } = require('../models/webTechModel');
const { paginationHelper } = require('../services/paginationHelper');

// Get all WebTechs => /v1/api/webtechs
exports.getAllWebTechs = asyncHandler(async (req, res, next) => {
  const { resultPerPage, skip } = paginationHelper(req);

  const webtechs = await WebTech.find().limit(resultPerPage).skip(skip);

  if (!webtechs || webtechs.length === 0)
    return next(new AppError('No webtech found', 404));

  return res.status(200).json({ success: true, content: webtechs });
});

// Get a specific WebTech => /v1/api/webtechs/:webtechId
exports.getWebTech = asyncHandler(async (req, res, next) => {
  const { webtechId } = req.params;

  if (!webtechId || !isValidObjectId(webtechId))
    return next(new AppError('Invalid/Missing webtechId', 400));

  const webtech = await WebTech.findById(webtechId);
  if (!webtech) return next(new AppError('No webtech found', 404));

  return res.status(200).json({ success: true, content: webtech });
});

// Get all WebTechs for a specific WebTech => /v1/api/webtechs/:webtechId/topics
exports.getWebTechTopics = asyncHandler(async (req, res, next) => {
  const { resultPerPage, skip } = paginationHelper(req);
  const { webtechId } = req.params;

  if (!webtechId || !isValidObjectId(webtechId))
    return next(new AppError('Invalid/Missing webtechId', 400));

  const topics = await WebTechTopic.find({ webtechId })
    .limit(resultPerPage)
    .skip(skip);
  if (!topics) return next(new AppError('No webtechs found', 404));

  return res.status(200).json({ success: true, content: topics });
});

// Get a Topic for a specific WebTech => /v1/api/webtechs/:webtechId/topics/:topicId
exports.getWebTechTopic = asyncHandler(async (req, res, next) => {
  const { webtechId, topicId } = req.params;

  if (!webtechId || !topicId || !isValidObjectId(webtechId, topicId))
    return next(new AppError('Invalid/Missing webtechId/topicId', 400));

  const topic = await WebTechTopic.findOne({
    webtechId,
    webtechTopicId: topicId,
  });
  if (!topic) return next(new AppError('No topic found', 404));

  return res.status(200).json({ success: true, content: topic });
});

// Get all SubTopics for a Topic => /v1/api/webtechs/:webtechId/topics/:topicId/subtopics
exports.getWebTechSubTopics = asyncHandler(async (req, res, next) => {
  const { resultPerPage, skip } = paginationHelper(req);
  const { webtechId, topicId } = req.params;

  if (!webtechId || !topicId || !isValidObjectId(webtechId, topicId))
    return next(new AppError('Invalid/Missing webtechId/topicId', 400));

  const subTopics = await WebTechTopic.find({
    webtechId,
    webtechTopicId: topicId,
  })
    .limit(resultPerPage)
    .skip(skip);
  if (!subTopics) return next(new AppError('No subtopics found', 404));

  return res.status(200).json({ success: true, content: subTopics });
});

// Get SubTopic for a Topic => /v1/api/webtechs/:webtechId/topics/:topicId/subtopics/:subtopicId
// The :subtopicId is the WebTechTopic _id which would be passed as the :subtopicId in the parameter
exports.getWebTechSubTopic = asyncHandler(async (req, res, next) => {
  const { webtechId, topicId, subtopicId } = req.params;

  if (
    !webtechId ||
    !topicId ||
    !subtopicId ||
    !isValidObjectId(webtechId, topicId, subtopicId)
  )
    return next(
      new AppError('Invalid/Missing webtechId/topicId/subtopicId', 400)
    );

  const subTopic = await WebTechTopic.findOne({
    webtechId,
    webtechTopicId: topicId,
    _id: subtopicId,
  });
  if (!subTopic) return next(new AppError('No subtopic found', 404));

  return res.status(200).json({ success: true, content: subTopic });
});

// Create a WebTech => /v1/api/webtechs
exports.createWebTech = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description)
    return next(new AppError('WebTech name or description missing', 400));

  const webtech = await WebTech.create({ name, description });
  if (!webtech)
    return next(new AppError('Error occured creating WebTech', 500));

  return res.status(201).json({ success: true, message: 'WebTech created' });
});

// Create a Topic of an existing WebTech => /v1/api/webtech/:webtechId
exports.createWebTechTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { webtechId } = req.params;

  if (!name || !description || !content || !isValidObjectId(webtechId))
    return next(
      new AppError(
        'Invalid/Missing WebTech topic name/description/content',
        400
      )
    );

  const existsWebTech = await WebTech.findById(webtechId);
  if (!existsWebTech) return next(new AppError('WebTech does not exist', 404));

  const webTechTopic = await WebTechTopic.create({
    name,
    description,
    content,
    webtechId,
  });
  if (!webTechTopic)
    return next(new AppError('Error occured creating webtech topic', 500));

  return res
    .status(201)
    .json({ success: true, message: 'WebTech topic created' });
});

// Create a subtopic for a webtech topic => /v1/api/webtechs/:webtechId/topics/:topicId
exports.createWebTechSubTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { webtechId, topicId } = req.params;

  if (!name || !description || !content || !isValidObjectId(webtechId, topicId))
    return next(
      new AppError(
        'Invalid/Missing WebTech subtopic name/description/content',
        400
      )
    );

  const existsWebTech = await WebTech.findById(webtechId);
  const existsWebTechTopic = await WebTechTopic.findById(topicId);
  if (!existsWebTech || !existsWebTechTopic)
    return next(new AppError('WebTech or Topic does not exist', 404));

  const subTopic = await WebTechTopic.create({
    name,
    description,
    content,
    webtechTopicId: topicId,
    webtechId,
  });
  if (!subTopic)
    return next(new AppError('Error occured creating webtech subtopic', 500));

  return res
    .status(201)
    .json({ success: true, message: 'Webtech subtopic created' });
});

// Update a specific webtech => /v1/api/webtechs/:webtechId
exports.updateWebTech = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  const { webtechId } = req.params;

  if (!webtechId || !isValidObjectId(webtechId))
    return next(new AppError('Invalid/Missing webtechId', 400));

  const updatedWebTech = await WebTech.findByIdAndUpdate(webtechId, {
    name,
    description,
  });
  if (!updatedWebTech)
    return next(new AppError('Error occured updating WebTech', 500));

  return res.status(200).json({ success: true, message: 'WebTech updated' });
});

// Update a specific webtech topic => /v1/api/webtechs/:webtechId/topics/:topicId
exports.updateWebTechTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { webtechId, topicId } = req.params;

  if (!webtechId || !topicId || !isValidObjectId(webtechId, topicId))
    return next(new AppError('Invalid/Missing webtechId/topicId', 400));

  const webtech = await WebTech.findById(webtechId);
  if (!webtech) return next(new AppError('No webtech found', 404));

  const updatedTopic = await WebTechTopic.findByIdAndUpdate(
    { _id: topicId },
    { name, description, content }
  );
  if (!updatedTopic)
    return next(new AppError('Error occured updating Topic', 500));

  return res.status(200).json({ success: true, message: 'Topic updated' });
});

// Update a specific webtech subtopic => /v1/api/webtechs/:webtechId/topics/:topicId/subtopics/:subtopicId
exports.updateWebTechSubTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { webtechId, topicId, subtopicId } = req.params;

  if (
    !webtechId ||
    !topicId ||
    !subtopicId ||
    !isValidObjectId(webtechId, topicId, subtopicId)
  )
    return next(
      new AppError('Invalid/Missing webtechId/topicId/subtopicId', 400)
    );

  const webtech = await WebTech.findById(webtechId);
  const topic = await WebTechTopic.findById(topicId);
  if (!webtech && !topic)
    return next(new AppError('No webtech and topic found', 404));

  const updatedSubTopic = await WebTechTopic.findByIdAndUpdate(subtopicId, {
    name,
    description,
    content,
  });
  if (!updatedSubTopic)
    return next(new AppError('Error occured updating SubTopic', 500));

  return res.status(200).json({ success: true, message: 'SubTopic updated' });
});

// Delete a single WebTech => /v1/api/webtechs/:webtechId
exports.deleteWebTech = asyncHandler(async (req, res, next) => {
  const { webtechId } = req.params;

  if (!webtechId || !isValidObjectId(webtechId))
    return next(new AppError('Invalid/Missing webtechId', 400));

  const deletedWebTech = await WebTech.findByIdAndDelete(webtechId);
  if (!deletedWebTech)
    return next(new AppError('Error occured deleting WebTech', 500));

  return res.status(200).json({ success: true, message: 'WebTech deleted' });
});

// Delete a single Topic => /v1/api/webtechs/:webtechId/topics/:topicId
exports.deleteWebTechTopic = asyncHandler(async (req, res, next) => {
  const { webtechId, topicId } = req.params;

  if (!webtechId || !topicId || !isValidObjectId(webtechId, topicId))
    return next(new AppError('Invalid/Missing webtechId/topicId', 400));

  const webtech = await WebTech.findById(webtechId);
  if (!webtech) return next(new AppError('No webtech found', 404));

  const deletedWebTech = await WebTechTopic.findByIdAndDelete(topicId);
  if (!deletedWebTech)
    return next(new AppError('Error occured deleting Topic', 500));

  return res.status(200).json({ success: true, message: 'Topic deleted' });
});

// Delete a single SubTopic => /v1/api/webtechs/:webtechId/topics/:topicId/subtopics/:subtopicId
exports.deleteWebTechSubTopic = asyncHandler(async (req, res, next) => {
  const { webtechId, topicId, subtopicId } = req.params;

  if (
    !webtechId ||
    !topicId ||
    !subtopicId ||
    !isValidObjectId(webtechId, topicId, subtopicId)
  )
    return next(
      new AppError('Invalid/Missing webtechId/topicId/subtopicId', 400)
    );

  const webtech = await WebTech.findById(webtechId);
  const topic = await WebTechTopic.findById(topicId);
  if (!webtech && !topic)
    return next(new AppError('No webtech and topic found', 404));

  const deletedTopic = await WebTechTopic.findByIdAndDelete(subtopicId);
  if (!deletedTopic)
    return next(new AppError('Error occured deleting Topic', 500));

  return res.status(200).json({ success: true, message: 'Subtopic deleted' });
});
