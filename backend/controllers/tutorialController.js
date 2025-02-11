// Tutorial controller
const { asyncHandler, AppError } = require('../services/errorHandler');
const { Tutorial, TutorialTopic } = require('../models/tutorialModel');
const { paginationHelper } = require('../services/paginationHelper');

// Get all Tutorials => /v1/api/tutorials
exports.getAllTutorials = asyncHandler(async (req, res, next) => {
  const { resultPerPage, skip } = paginationHelper(req);

  const tutorials = await Tutorial.find().limit(resultPerPage).skip(skip);

  if (!tutorials || tutorials.length === 0)
    return next(new AppError('No tutorial found', 404));

  return res.status(200).json({ success: true, content: tutorials });
});

// Get a specific Tutorial => /v1/api/tutorials/:tutorialId
exports.getTutorial = asyncHandler(async (req, res, next) => {
  const { tutorialId } = req.params;

  if (!tutorialId) return next(new AppError('Invalid tutorialId', 400));

  const tutorial = await Tutorial.findById(tutorialId);
  if (!tutorial) return next(new AppError('No tutorial found', 404));

  return res.status(200).json({ success: true, content: tutorial });
});

// Get all Topics for a specific Tutorial => /v1/api/tutorials/:tutorialId/topics
exports.getTutorialTopics = asyncHandler(async (req, res, next) => {
  const { resultPerPage, skip } = paginationHelper(req);
  const { tutorialId } = req.params;

  if (!tutorialId) return next(new AppError('Invalid/No tutorialId', 400));

  const topics = await TutorialTopic.find({ tutorialId })
    .limit(resultPerPage)
    .skip(skip);
  if (!topics) return next(new AppError('No topics found', 404));

  return res.status(200).json({ success: true, content: topics });
});

// Get a Topic for a specific Tutorial => /v1/api/tutorials/:tutorialId/topics/:topicId
exports.getTutorialTopic = asyncHandler(async (req, res, next) => {
  const { tutorialId, topicId } = req.params;

  if (!tutorialId || !topicId)
    return next(new AppError('Invalid/No tutorialId or topicId', 400));

  const topic = await TutorialTopic.findOne({
    tutorialId,
    tutorialTopicId: topicId,
  });
  if (!topic) return next(new AppError('No topic found', 404));

  return res.status(200).json({ success: true, content: topic });
});

// Get all SubTopics for a Topic => /v1/api/tutorials/:tutorialId/topics/:topicId/subtopics
exports.getTutorialSubTopics = asyncHandler(async (req, res, next) => {
  const { resultPerPage, skip } = paginationHelper(req);
  const { tutorialId, topicId } = req.params;

  if (!tutorialId || !topicId)
    return next(new AppError('Invalid tutorialId or topicId', 400));

  const subTopics = await TutorialTopic.find({
    tutorialId,
    tutorialTopicId: topicId,
  })
    .limit(resultPerPage)
    .skip(skip);
  if (!subTopics) return next(new AppError('No subtopics found', 404));

  return res.status(200).json({ success: true, content: subTopics });
});

// Get SubTopic for a Topic => /v1/api/tutorials/:tutorialId/topics/:topicId/subtopics/:subtopicId
// The :subtopicId is the TutorialTopic _id which would be passed as the :subtopicId in the parameter
exports.getTutorialSubTopic = asyncHandler(async (req, res, next) => {
  const { tutorialId, topicId, subtopicId } = req.params;

  if (!tutorialId || !topicId || !subtopicId)
    return next(new AppError('Invalid/No tutorialId/topicId/subtopicId', 400));

  const subTopic = await TutorialTopic.findOne({
    tutorialId,
    tutorialTopicId: topicId,
    _id: subtopicId,
  });
  if (!subTopic) return next(new AppError('No subtopic found', 404));

  return res.status(200).json({ success: true, content: subTopic });
});

// Create a Tutorial => /v1/api/tutorials
exports.createTutorial = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description)
    return next(new AppError('Tutorial name or description missing', 400));

  const tutorial = await Tutorial.create({ name, description });
  if (!tutorial)
    return next(new AppError('Error occured creating tutorial', 500));

  return res.status(201).json({ success: true, message: 'Tutorial created' });
});

// Create a Topic of an existing tutorial => /v1/api/tutorials/:tutorialId
exports.createTutorialTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { tutorialId } = req.params;

  if (!name || !description || !content)
    return next(
      new AppError('Tutorial topic name/description/content missing', 400)
    );

  const existsTutorial = await Tutorial.findById(tutorialId);
  if (!existsTutorial)
    return next(new AppError('Tutorial does not exist', 404));

  const tutorialTopic = await TutorialTopic.create({
    name,
    description,
    content,
    tutorialId,
  });
  if (!tutorialTopic)
    return next(new AppError('Error occured creating tutorial topic', 500));

  return res
    .status(201)
    .json({ success: true, message: 'Tutorial topic created' });
});

// Create a subtopic for a tutorial topic => /v1/api/tutorials/:tutorialId/topics/:topicId
exports.createTutorialSubTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { tutorialId, topicId } = req.params;

  if (!name || !description || !content)
    return next(
      new AppError('Tutorial subtopic name/description/content missing', 400)
    );

  const existsTutorial = await Tutorial.findById(tutorialId);
  const existsTutorialTopic = await TutorialTopic.findById(topicId);
  if (!existsTutorial || !existsTutorialTopic)
    return next(new AppError('Tutorial or Topic does not exist', 404));

  const subTopic = await TutorialTopic.create({
    name,
    description,
    content,
    tutorialTopicId: topicId,
    tutorialId,
  });
  if (!subTopic)
    return next(new AppError('Error occured creating tutorial subtopic', 500));

  return res
    .status(201)
    .json({ success: true, message: 'Tutorial subtopic created' });
});

// Update a specific tutorial => /v1/api/tutorials/:tutorialId
exports.updateTutorial = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  const { tutorialId } = req.params;

  if (!tutorialId) return next(new AppError('Invalid/No tutorialId', 400));

  const updatedTutorial = await Tutorial.findByIdAndUpdate(tutorialId, {
    name,
    description,
  });
  if (!updatedTutorial)
    return next(new AppError('Error occured updating Tutorial', 500));

  return res.status(200).json({ success: true, message: 'Tutorial updated' });
});

// Update a specific tutorial topic => /v1/api/tutorials/:tutorialId/topics/:topicId
exports.updateTutorialTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { tutorialId, topicId } = req.params;

  if (!tutorialId || !topicId)
    return next(new AppError('Invalid/No tutorialId/topicId', 400));

  const tutorial = await Tutorial.findById(tutorialId);
  if (!tutorial) return next(new AppError('No tutorial found', 404));

  const updatedTopic = await TutorialTopic.findByIdAndUpdate(
    { _id: topicId },
    { name, description, content }
  );
  if (!updatedTopic)
    return next(new AppError('Error occured updating Topic', 500));

  return res.status(200).json({ success: true, message: 'Topic updated' });
});

// Update a specific tutorial subtopic => /v1/api/tutorials/:tutorilalId/topics/:topicId/subtopics/:subtopicId
exports.updateTutorialSubTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { tutorialId, topicId, subtopicId } = req.params;

  if (!tutorialId || !topicId || !subtopicId)
    return next(new AppError('Invalid tutorialId/topicId/subtopicId', 400));

  const tutorial = await Tutorial.findById(tutorialId);
  const topic = await TutorialTopic.findById(topicId);
  if (!tutorial && !topic)
    return next(new AppError('No tutorial and topic found', 404));

  const updatedSubTopic = await TutorialTopic.findByIdAndUpdate(subtopicId, {
    name,
    description,
    content,
  });
  if (!updatedSubTopic)
    return next(new AppError('Error occured updating SubTopic', 500));

  return res.status(200).json({ success: true, message: 'SubTopic updated' });
});

// Delete a single Tutorial => /v1/api/tutorials/:tutorialId
exports.deleteTutorial = asyncHandler(async (req, res, next) => {
  const { tutorialId } = req.params;

  if (!tutorialId) return next(new AppError('Invalid tutorialId', 400));

  const deletedTutorial = await Tutorial.findByIdAndDelete(tutorialId);
  if (!deletedTutorial)
    return next(new AppError('Error occured deleting Tutorial', 500));

  return res.status(200).json({ success: true, message: 'Tutorial deleted' });
});

// Delete a single Topic => /v1/api/tutorials/:tutorialId/topics/:topicId
exports.deleteTutorialTopic = asyncHandler(async (req, res, next) => {
  const { tutorialId, topicId } = req.params;

  if (!tutorialId || !topicId)
    return next(new AppError('Invalid tutorialId/topicId', 400));

  const tutorial = await Tutorial.findById(tutorialId);
  if (!tutorial) return next(new AppError('No tutorial found', 404));

  const deletedTopic = await TutorialTopic.findByIdAndDelete(topicId);
  if (!deletedTopic)
    return next(new AppError('Error occured deleting Topic', 500));

  return res.status(200).json({ success: true, message: 'Topic deleted' });
});

// Delete a single SubTopic => /v1/api/tutorials/:tutorialId/topics/:topicId/subtopics/:subtopicId
exports.deleteTutorialSubTopic = asyncHandler(async (req, res, next) => {
  const { tutorialId, topicId, subtopicId } = req.params;

  if (!tutorialId || !topicId || !subtopicId)
    return next(new AppError('Invalid tutorialId/topicId/subtopicId', 400));

  const tutorial = await Tutorial.findById(tutorialId);
  const topic = await TutorialTopic.findById(topicId);
  if (!tutorial && !topic)
    return next(new AppError('No tutorial and topic found', 404));

  const deletedTopic = await TutorialTopic.findByIdAndDelete(subtopicId);
  if (!deletedTopic)
    return next(new AppError('Error occured deleting Topic', 500));

  return res.status(200).json({ success: true, message: 'Subtopic deleted' });
});
