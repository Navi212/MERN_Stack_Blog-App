// Api route for Blogs
const express = require('express');

const router = express.Router();
const util = require('util');
const jwt = require('jsonwebtoken');

jwt.verify = util.promisify(jwt.verify);
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isAuthorized } = require('../middlewares/isAuthorized');
const {
  categorySchema,
  blogSchema,
  commentSchema,
  validateInputs,
} = require('../middlewares/validators/inputValidator');
const {
  getAllCategories,
  getAllPostsForCategory,
  getPost,
  getAllCommentsForPost,
  getAllCommentsForComment,
  getComment,
  getAllLikesForPost,
  createCategory,
  createPost,
  createComment,
  createReplyComment,
  createLike,
  updateCategory,
  updatePost,
  updateComment,
  deleteCategory,
  deletePost,
  deleteComment,
  deleteLike,
} = require('../controllers/blogController');

// Routes for GET requests
router.get('/', getAllCategories);
router.get('/:categoryId/posts', getAllPostsForCategory);
router.get('/:categoryId/posts/:postId', getPost);
router.get('/:categoryId/posts/:postId/comments', getAllCommentsForPost);
router.get(
  '/:categoryId/posts/:postId/comments/:commentId/comments',
  getAllCommentsForComment
);
router.get('/:categoryId/posts/:postId/comments/:commentId', getComment);
router.get('/:categoryId/posts/:postId/likes', getAllLikesForPost);

// Routes for POST requests
router.post(
  '/',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('POST', categorySchema),
  createCategory
);
router.post(
  '/:categoryId/posts',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('POST', blogSchema),
  createPost
);
router.post(
  '/:categoryId/posts/:postId/comments',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('POST', commentSchema),
  createComment
);
router.post(
  '/:categoryId/posts/:postId/comments/:commentId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('POST', commentSchema),
  createReplyComment
);
router.post(
  '/:categoryId/posts/:postId/likes',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  createLike
);

// Routes for PUT requests
router.put(
  '/:categoryId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('PUT', categorySchema),
  updateCategory
);
router.put(
  '/:categoryId/posts/:postId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('PUT', blogSchema),
  updatePost
);
router.put(
  '/:categoryId/posts/:postId/comments/:commentId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin', 'Moderator']),
  validateInputs('PUT', commentSchema),
  updateComment
);

// Routes for DELETE requests
router.delete(
  '/:categoryId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteCategory
);
router.delete(
  '/:categoryId/posts/:postId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deletePost
);
router.delete(
  '/:categoryId/posts/:postId/comments/:commentId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteComment
);
router.delete(
  '/:categoryId/posts/:postId/likes/:likeId',
  isAuthenticated,
  isAuthorized(['SuperAdmin', 'Admin']),
  deleteLike
);

module.exports = router;
