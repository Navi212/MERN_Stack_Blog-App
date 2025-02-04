// Model for Blog
const mongoose = require('mongoose');

// category model
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', CategorySchema);

// Post model
const PostSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
    title: { type: String, required: true },
    content: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

// Comment model
const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', CommentSchema);

// Like model
const LikeSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  },
  { timestamps: true }
);

const Like = mongoose.model('Like', LikeSchema);

module.exports = {
  Category,
  Post,
  Comment,
  Like,
};
