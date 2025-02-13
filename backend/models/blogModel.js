// Model for Blog
const mongoose = require('mongoose');

// category model
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

exports.Category = mongoose.model('Category', CategorySchema);

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

exports.Post = mongoose.model('Post', PostSchema);

// Comment model
const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  },
  { timestamps: true }
);

exports.Comment = mongoose.model('Comment', CommentSchema);

// Like model
const LikeSchema = new mongoose.Schema(
  {
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  },
  { timestamps: true }
);

exports.Like = mongoose.model('Like', LikeSchema);
