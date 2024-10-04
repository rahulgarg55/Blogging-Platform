const express = require('express');
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  addComment,
  countBlogsByAuthor,
  averageCommentLength,
} = require('../controllers/blogController');

const router = express.Router();

router.route('/').post(createBlog).get(getAllBlogs);
router.route('/:id').get(getBlogById).put(updateBlog).delete(deleteBlog);
router.route('/:blogId/comments').post(addComment);
router.route('/stats/author-count').get(countBlogsByAuthor);
router.route('/stats/comment-length').get(averageCommentLength);

module.exports = router;
