// Courses controller
const { asyncHandler, AppError } = require('../services/errorHandler');
const { isValidObjectId } = require('../services/validateMongoObjectId');
const { Course, CourseTopic } = require('../models/courseModel');
const { paginationHelper } = require('../services/paginationHelper');

// Get all Courses => /v1/api/courses
exports.getAllCourses = asyncHandler(async (req, res, next) => {
  const { resultPerPage, skip } = paginationHelper(req);

  const courses = await Course.find().limit(resultPerPage).skip(skip);

  if (!courses || courses.length === 0)
    return next(new AppError('No course found', 404));

  return res.status(200).json({ success: true, content: courses });
});

// Get a specific Course => /v1/api/courses/:courseId
exports.getCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;

  if (!courseId || !isValidObjectId(courseId))
    return next(new AppError('Invalid/Missing courseId', 400));

  const course = await Course.findById(courseId);
  if (!course) return next(new AppError('No course found', 404));

  return res.status(200).json({ success: true, content: course });
});

// Get all Courses for a specific Course => /v1/api/courses/:courseId/topics
exports.getCourseTopics = asyncHandler(async (req, res, next) => {
  const { resultPerPage, skip } = paginationHelper(req);
  const { courseId } = req.params;

  if (!courseId || !isValidObjectId(courseId))
    return next(new AppError('Invalid/Missing courseId', 400));

  const topics = await CourseTopic.find({ courseId })
    .limit(resultPerPage)
    .skip(skip);
  if (!topics) return next(new AppError('No topics found', 404));

  return res.status(200).json({ success: true, content: topics });
});

// Get a Topic for a specific Course => /v1/api/courses/:courseId/topics/:topicId
exports.getCourseTopic = asyncHandler(async (req, res, next) => {
  const { courseId, topicId } = req.params;

  if (!courseId || !topicId || !isValidObjectId(courseId, topicId))
    return next(new AppError('Invalid/Missing courseId/topicId', 400));

  const topic = await CourseTopic.findOne({
    courseId,
    courseTopicId: topicId,
  });
  if (!topic) return next(new AppError('No topic found', 404));

  return res.status(200).json({ success: true, content: topic });
});

// Get all SubTopics for a Topic => /v1/api/courses/:courseId/topics/:topicId/subtopics
exports.getCourseSubTopics = asyncHandler(async (req, res, next) => {
  const { resultPerPage, skip } = paginationHelper(req);
  const { courseId, topicId } = req.params;

  if (!courseId || !topicId || !isValidObjectId(courseId, topicId))
    return next(new AppError('Invalid/Missing courseId/topicId', 400));

  const subTopics = await CourseTopic.find({
    courseId,
    courseTopicId: topicId,
  })
    .limit(resultPerPage)
    .skip(skip);
  if (!subTopics) return next(new AppError('No subtopics found', 404));

  return res.status(200).json({ success: true, content: subTopics });
});

// Get SubTopic for a Topic => /v1/api/courses/:courseId/topics/:topicId/subtopics/:subtopicId
// The :subtopicId is the CourseTopic _id which would be passed as the :subtopicId in the parameter
exports.getCourseSubTopic = asyncHandler(async (req, res, next) => {
  const { courseId, topicId, subtopicId } = req.params;

  if (
    !courseId ||
    !topicId ||
    !subtopicId ||
    !isValidObjectId(courseId, topicId, subtopicId)
  )
    return next(
      new AppError('Invalid/Missing courseId/topicId/subtopicId', 400)
    );

  const subTopic = await CourseTopic.findOne({
    courseId,
    courseTopicId: topicId,
    _id: subtopicId,
  });
  if (!subTopic) return next(new AppError('No subtopic found', 404));

  return res.status(200).json({ success: true, content: subTopic });
});

// Create a Course => /v1/api/courses
exports.createCourse = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description)
    return next(new AppError('Invalid/Missing Course name/description', 400));

  const course = await Course.create({ name, description });
  if (!course) return next(new AppError('Error occured creating Course', 500));

  return res.status(201).json({ success: true, message: 'Course created' });
});

// Create a Topic of an existing Course => /v1/api/course/:courseId
exports.createCourseTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { courseId } = req.params;

  if (!name || !description || !content || !isValidObjectId(courseId))
    return next(
      new AppError('Invalid/Missing topic name/description/content', 400)
    );

  const existsCourse = await Course.findById(courseId);
  if (!existsCourse) return next(new AppError('Course does not exist', 404));

  const courseTopic = await CourseTopic.create({
    name,
    description,
    content,
    courseId,
  });
  if (!courseTopic)
    return next(new AppError('Error occured creating course topic', 500));

  return res
    .status(201)
    .json({ success: true, message: 'Course topic created' });
});

// Create a subtopic for a course topic => /v1/api/courses/:courseId/topics/:topicId
exports.createCourseSubTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { courseId, topicId } = req.params;

  if (!name || !description || !content || !isValidObjectId(courseId, topicId))
    return next(new AppError('Invalid/Missing name/description/content', 400));

  const existsCourse = await Course.findById(courseId);
  const existsCourseTopic = await CourseTopic.findById(topicId);
  if (!existsCourse || !existsCourseTopic)
    return next(new AppError('Course or Topic does not exist', 404));

  const subTopic = await CourseTopic.create({
    name,
    description,
    content,
    courseTopicId: topicId,
    courseId,
  });
  if (!subTopic)
    return next(new AppError('Error occured creating course subtopic', 500));

  return res
    .status(201)
    .json({ success: true, message: 'Course subtopic created' });
});

// Update a specific course => /v1/api/courses/:courseId
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  const { courseId } = req.params;

  if (!courseId || !isValidObjectId(courseId))
    return next(new AppError('Invalid/Missing courseId', 400));

  const updatedCourse = await Course.findByIdAndUpdate(courseId, {
    name,
    description,
  });
  if (!updatedCourse)
    return next(new AppError('Error occured updating Course', 500));

  return res.status(200).json({ success: true, message: 'Course updated' });
});

// Update a specific course topic => /v1/api/courses/:courseId/topics/:topicId
exports.updateCourseTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { courseId, topicId } = req.params;

  if (!courseId || !topicId || !isValidObjectId(courseId, topicId))
    return next(new AppError('Invalid/Missing courseId/topicId', 400));

  const course = await Course.findById(courseId);
  if (!course) return next(new AppError('No course found', 404));

  const updatedTopic = await CourseTopic.findByIdAndUpdate(
    { _id: topicId },
    { name, description, content }
  );
  if (!updatedTopic)
    return next(new AppError('Error occured updating Topic', 500));

  return res.status(200).json({ success: true, message: 'Topic updated' });
});

// Update a specific course subtopic => /v1/api/courses/:courseId/topics/:topicId/subtopics/:subtopicId
exports.updateCourseSubTopic = asyncHandler(async (req, res, next) => {
  const { name, description, content } = req.body;
  const { courseId, topicId, subtopicId } = req.params;

  if (
    !courseId ||
    !topicId ||
    !subtopicId ||
    !isValidObjectId(courseId, topicId, subtopicId)
  )
    return next(
      new AppError('Invalid/Missing courseId/topicId/subtopicId', 400)
    );

  const course = await Course.findById(courseId);
  const topic = await CourseTopic.findById(topicId);
  if (!course && !topic)
    return next(new AppError('No course and topic found', 404));

  const updatedSubTopic = await CourseTopic.findByIdAndUpdate(subtopicId, {
    name,
    description,
    content,
  });
  if (!updatedSubTopic)
    return next(new AppError('Error occured updating SubTopic', 500));

  return res.status(200).json({ success: true, message: 'SubTopic updated' });
});

// Delete a single Course => /v1/api/courses/:courseId
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;

  if (!courseId || !isValidObjectId(courseId))
    return next(new AppError('Invalid/Missing courseId', 400));

  const deletedCourse = await Course.findByIdAndDelete(courseId);
  if (!deletedCourse)
    return next(new AppError('Error occured deleting Course', 500));

  return res.status(200).json({ success: true, message: 'Course deleted' });
});

// Delete a single Topic => /v1/api/courses/:courseId/topics/:topicId
exports.deleteCourseTopic = asyncHandler(async (req, res, next) => {
  const { courseId, topicId } = req.params;

  if (!courseId || !topicId || !isValidObjectId(courseId, topicId))
    return next(new AppError('Invalid/Missing courseId/topicId', 400));

  const course = await Course.findById(courseId);
  if (!course) return next(new AppError('No course found', 404));

  const deletedCourse = await CourseTopic.findByIdAndDelete(topicId);
  if (!deletedCourse)
    return next(new AppError('Error occured deleting Topic', 500));

  return res.status(200).json({ success: true, message: 'Topic deleted' });
});

// Delete a single SubTopic => /v1/api/courses/:courseId/topics/:topicId/subtopics/:subtopicId
exports.deleteCourseSubTopic = asyncHandler(async (req, res, next) => {
  const { courseId, topicId, subtopicId } = req.params;

  if (
    !courseId ||
    !topicId ||
    !subtopicId ||
    !isValidObjectId(courseId, topicId, subtopicId)
  )
    return next(
      new AppError('Invalid/Missing courseId/topicId/subtopicId', 400)
    );

  const course = await Course.findById(courseId);
  const topic = await CourseTopic.findById(topicId);
  if (!course && !topic)
    return next(new AppError('No course and topic found', 404));

  const deletedTopic = await CourseTopic.findByIdAndDelete(subtopicId);
  if (!deletedTopic)
    return next(new AppError('Error occured deleting Topic', 500));

  return res.status(200).json({ success: true, message: 'Subtopic deleted' });
});
