const { Category, Post, Comment, Like } = require('../models/blogModel');
const { AppError, asyncHandler } = require('../services/errorHandler');
// isValidObjectId makes sure we have a valid id before calling the DB
const { isValidObjectId } = require('../services/validateMongoObjectId');

// Get all Categories => /v1/api/blogs
exports.getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();

  if (!categories) return next(new AppError('No categories found', 404));

  return res.status(200).json({ success: true, content: categories });
});

// Get all Posts for a single Category => /v1/api/blogs/:categoryId/posts
exports.getAllPostsForCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;

  if (!categoryId || !isValidObjectId(categoryId))
    return next(new AppError('No/Invalid categoryId', 400));

  const category = await Category.findById(categoryId);
  if (!category) return next(new AppError('No category found', 404));

  const posts = await Post.find({ categoryId });
  if (!posts) return next(new AppError('No posts found', 404));

  return res.status(200).json({ success: true, content: posts });
});

// Get Post for a single Category => /v1/api/blogs/:categoryId/posts/:postId
exports.getPost = asyncHandler(async (req, res, next) => {
  const { categoryId, postId } = req.params;

  if (!categoryId || !postId || !isValidObjectId(categoryId, postId))
    return next(new AppError('No/Invalid categoryId/postId', 400));

  const post = await Post.findOne({ _id: postId, categoryId });
  if (!post) return next(new AppError('No post found', 404));

  return res.status(200).json({ success: true, content: post });
});

// Get all Comments for a single Post => /v1/api/blogs/:categoryId/posts/:postId/comments
exports.getAllCommentsForPost = asyncHandler(async (req, res, next) => {
  const { categoryId, postId } = req.params;

  if (!categoryId || !postId || !isValidObjectId(categoryId, postId))
    return next(new AppError('No/Invalid categoryId/postId', 400));

  const post = await Post.findOne({ _id: postId, categoryId });
  if (!post) return next(new AppError('Post not found for this category', 404));

  const comments = await Comment.find({ postId });
  if (!comments || comments.length === 0)
    return next(new AppError('No comments found', 404));

  return res.status(200).json({ success: true, content: comments });
});

// Get all Comments for a single Comment => /v1/api/blogs/:categoryId/posts/:postId/comments/:commentId/comments
exports.getAllCommentsForComment = asyncHandler(async (req, res, next) => {
  const { categoryId, postId, commentId } = req.params;

  if (
    !categoryId ||
    !postId ||
    !commentId ||
    !isValidObjectId(categoryId, postId, commentId)
  )
    return next(new AppError('No/Invalid categoryId/postId/commentId', 400));

  const post = await Post.findOne({ _id: postId, categoryId });
  if (!post) return next(new AppError('Post not found for this category', 404));

  const comment = await Comment.findById(commentId);
  if (!comment)
    return next(new AppError('Comment not found for this Post', 404));

  const comments = await Comment.find({ postId, commentId });
  if (!comments || comments.length === 0)
    return next(new AppError('No comments found', 404));

  return res.status(200).json({ success: true, content: comments });
});

// Get Comment for a single Post => /v1/api/blogs/:categoryId/posts/:postId/comments/:commentId
exports.getComment = asyncHandler(async (req, res, next) => {
  const { categoryId, postId, commentId } = req.params;

  if (
    !categoryId ||
    !postId ||
    !commentId ||
    !isValidObjectId(categoryId, postId, commentId)
  )
    return next(new AppError('No/Invalid categoryId/postId/commentId', 400));

  const post = await Post.findOne({ _id: postId, categoryId });
  if (!post) return next(new AppError('Post does not exist', 404));

  const comment = await Comment.findById(commentId);
  if (!comment) return next(new AppError('No Comment found', 404));

  return res.status(200).json({ success: true, content: comment });
});

// Get all Likes for a single Post => /v1/api/blogs/:categoryId/posts/:postId/likes
exports.getAllLikesForPost = asyncHandler(async (req, res, next) => {
  const { categoryId, postId } = req.params;

  if (!categoryId || !postId || !isValidObjectId(categoryId, postId))
    return next(new AppError('No/Invalid categoryId/postId', 400));

  const post = await Post.findOne({ _id: postId, categoryId });
  if (!post) return next(new AppError('Post does not exist', 404));

  const likes = await Like.find();
  if (!likes || likes.length === 0)
    return next(new AppError('No likes found', 404));

  return res.status(200).json({ success: true, content: likes });
});

// Create Category => /v1/api/blogs
exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  const { userId } = req;

  if (!name || !description)
    return next(new AppError('name/description missing', 400));

  const category = await Category.create({
    name,
    description,
    creatorId: userId,
  });
  if (!category)
    return next(new AppError('Error occured creating category', 500));

  return res.status(201).json({ success: true, message: 'Category created' });
});

// Create Post for a single Category => /v1/api/blogs/:categoryId/posts
exports.createPost = asyncHandler(async (req, res, next) => {
  const { name, description, title, content } = req.body;
  const { categoryId } = req.params;
  const { userId } = req.user;

  if (
    !name ||
    !description ||
    !title ||
    !content ||
    !isValidObjectId(categoryId)
  )
    return next(
      new AppError('No/Invalid name/description/title/content/categoryId', 400)
    );

  const category = await Post.create({
    name,
    description,
    title,
    content,
    categoryId,
    authorId: userId,
  });
  if (!category)
    return next(new AppError('Error occured creating category', 500));

  return res.status(201).json({ success: true, message: 'Category created' });
});

// Create Comment for a single Post => /v1/api/blogs/:categoryId/posts/:postId/comments
exports.createComment = asyncHandler(async (req, res, next) => {
  const { categoryId, postId } = req.params;
  const { comment } = req.body;

  if (
    !categoryId ||
    !postId ||
    !comment ||
    !isValidObjectId(categoryId, postId)
  )
    return next(new AppError('No/Invalid categoryId/postId/comment', 400));

  const post = await Post.findOne({ _id: postId, categoryId });
  if (!post) return next(new AppError('Post does not exist', 404));

  const newComment = await Comment.create({ comment, categoryId, postId });
  if (!newComment) return next(new AppError('Error creating comment', 500));

  return res.status(201).json({ success: true, message: 'Comment created' });
});

// Create Comment for a single Comment => /v1/api/blogs/:categoryId/posts/:postId/comments/:commentId
exports.createReplyComment = asyncHandler(async (req, res, next) => {
  const { categoryId, postId, commentId } = req.params;
  const { comment } = req.body;

  if (
    !categoryId ||
    !postId ||
    !commentId ||
    !comment ||
    !isValidObjectId(categoryId, postId, commentId)
  )
    return next(
      new AppError('No/Invalid categoryId/postId/commentId/comment', 400)
    );

  const post = await Post.findOne({ _id: postId, categoryId });
  if (!post) return next(new AppError('Post does not exist', 404));

  const existsComment = await Comment.findById(commentId);
  if (!existsComment) return next(new AppError('comment does not exist', 404));

  const newComment = await Comment.create({ comment, postId, commentId });
  if (!newComment) return next(new AppError('Error creating comment', 500));

  return res.status(201).json({ success: true, message: 'Comment created' });
});

// Create Like for a single Post => /v1/api/blogs/:categoryId/posts/:postId/likes
exports.createLike = asyncHandler(async (req, res, next) => {
  const { categoryId, postId } = req.params;

  if (!categoryId || !postId || !isValidObjectId(categoryId, postId))
    return next(new AppError('No/Invalid categoryId/postId/comment', 400));

  const post = await Post.findOne({ _id: postId, categoryId });
  if (!post) return next(new AppError('Post does not exist', 404));

  const like = await Like.create({ categoryId, postId });
  if (!like) return next(new AppError('Error creating like', 500));

  return res.status(201).json({ success: true, message: 'like created' });
});

// Update Category => /v1/api/blogs/:categoryId
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const { name, description } = req.body;

  if (!categoryId || !isValidObjectId(categoryId))
    return next(new AppError('No/Invalid categoryId', 400));

  const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
    name,
    description,
  });
  if (!updatedCategory)
    return next(new AppError('Error updating category', 500));

  return res.status(201).json({ success: true, message: 'Category updated' });
});

// Update Post for a single Category => /v1/api/blogs/:categoryId/posts/:postId
exports.updatePost = asyncHandler(async (req, res, next) => {
  const { categoryId, postId } = req.params;
  const { name, description, title, content } = req.body;

  if (!categoryId || !postId || !isValidObjectId(categoryId, postId))
    return next(new AppError('No/Invalid categoryId/postId', 400));

  const post = await Post.findOne({ _id: postId, categoryId });
  if (!post) return next(new AppError('Post does not exist', 404));

  const updatedPost = await Post.findByIdAndUpdate(postId, {
    name,
    description,
    title,
    content,
  });
  if (!updatedPost)
    return next(new AppError('Error occured updating Post', 500));

  return res.status(200).json({ success: true, message: 'Post updated' });
});

// Update Comment for a single Post => /v1/api/blogs/:categoryId/posts/:postId/comments/:commentId
exports.updateComment = asyncHandler(async (req, res, next) => {
  const { categoryId, postId, commentId } = req.params;
  const { comment } = req.body;

  if (
    !categoryId ||
    !postId ||
    !commentId ||
    !isValidObjectId(categoryId, postId, commentId)
  )
    return next(new AppError('No/Invalid categoryId/postId/commentId', 400));

  const post = await Post.findOne({ _id: postId, categoryId });
  if (!post) return next(new AppError('Post does not exist', 400));

  const updatedComment = await Comment.findByIdAndUpdate(commentId, {
    comment,
  });
  if (!updatedComment)
    return next(new AppError('Error occured updating comment', 500));

  return res.status(200).json({ success: true, message: 'Comment updated' });
});

// Delete Category => /v1/api/blogs/:categoryId
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;

  if (!categoryId || !isValidObjectId(categoryId))
    return next(new AppError('No/Invalid categoryId', 400));

  const category = await Category.findById(categoryId);
  if (!category) return next(new AppError('Category does not exist', 404));

  const deletedCategory = await Category.findByIdAndDelete(categoryId);
  if (!deletedCategory)
    return next(new AppError('Error occured deleting category', 500));

  return res.status(200).json({ success: true, message: 'Category deleted' });
});

// Delete Post for a single Category => /v1/api/blogs/:categoryId/posts/:postId
exports.deletePost = asyncHandler(async (req, res, next) => {
  const { categoryId, postId } = req.params;

  if (!categoryId || !postId || !isValidObjectId(categoryId, postId))
    return next(new AppError('No/Invalid categoryId/postId', 400));

  const post = await Post.findOne({ _id: postId, categoryId });
  if (!post) return next(new AppError('Post does not exist', 404));

  const deletedPost = await Post.findByIdAndDelete(postId);
  if (!deletedPost)
    return next(new AppError('Error occured deleting Post', 500));

  return res.status(200).json({ success: true, message: 'Post deleted' });
});

// Delete Comment for a single Post => /v1/api/blogs/:categoryId/posts/:postId/comments/:commentId
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const { categoryId, postId, commentId } = req.params;

  if (
    !categoryId ||
    !postId ||
    !commentId ||
    !isValidObjectId(categoryId, postId, commentId)
  )
    return next(new AppError('No/Invalid categoryId/postId/commentId', 400));

  const post = await Post.findOne({ _id: postId, categoryId });
  if (!post) return next(new AppError('Post does not exist', 404));

  const deletedComment = await Comment.findByIdAndDelete(commentId);
  if (!deletedComment)
    return next(new AppError('Error occured deleting comment', 500));

  return res.status(200).json({ success: true, message: 'Comment deleted' });
});

// Delete Like for a single Post => /v1/api/blogs/:categoryId/posts/:postId/likes/:likeId
exports.deleteLike = asyncHandler(async (req, res, next) => {
  const { categoryId, postId, likeId } = req.params;

  if (
    !categoryId ||
    !postId ||
    !likeId ||
    !isValidObjectId(categoryId, postId, likeId)
  )
    return next(new AppError('No/Invalid categoryId/postId/likeId', 400));

  const post = await Post.findOne({ _id: postId, categoryId });
  if (!post) return next(new AppError('Post/Category does not exist', 404));

  const deletedLike = await Like.findByIdAndDelete(likeId);
  if (!deletedLike)
    return next(new AppError('Error occured deleting like', 500));

  return res.status(200).json({ success: true, message: 'Like deleted' });
});
