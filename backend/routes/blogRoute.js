// Api route for Blogs
const express = require('express');

const router = express.Router();
const util = require('util');
const jwt = require('jsonwebtoken');

jwt.verify = util.promisify(jwt.verify);
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isAuthorized } = require('../middlewares/isAuthorized');
const {
  getAllPosts,
  getAllPostsForCategory,
  getPost,
  createCategory,
  createPost,
  updateBlogs,
  updateCategory,
  updatePost,
  deleteBlogs,
  deleteCategory,
  deletePost,
  deletePosts,
} = require('../controllers/blogController');

// ============================================================================
// For Testing Only: Simulates authenticated and authorized route
router.get(
  '/posts/demo',
  isAuthenticated,
  isAuthorized(['Admin']),
  async (req, res) => {
    console.log('Admin you are welcome');
    return res
      .status(200)
      .json({ success: true, message: 'Admin is authorized!' });
  }
);
// =======================================================================

// Routes for GET requests
router.get('/posts', getAllPosts);
router.get('/category/:categoryId/posts', getAllPostsForCategory);
router.get('/category/:categoryId/posts/:postId', getPost);

// Routes for POST requests
router.post('/', createCategory);
router.post('/category/:categoryId/posts', createPost);

// Routes for PUT requests
router.put('/', updateBlogs);
router.put('/category/:categoryId', updateCategory);
router.put('/category/:categoryId/posts/:postId', updatePost);

// Routes for DELETE requests
router.delete('/', deleteBlogs);
router.delete('/category/:categoryId', deleteCategory);
router.delete('/category/:categoryId/posts', deletePosts);
router.delete('/category/:categoryId/posts/:postId', deletePost);

module.exports = router;
