const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
