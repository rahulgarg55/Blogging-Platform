const express = require('express'); 
const router = express.Router();    
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    createComment,
    getCommentsByBlogId,
    updateComment,
    deleteComment,
  } = require('../controllers/blogController'); 

  router.route('/').post(createBlog).get(getAllBlogs);
  router.route('/:id').get(getBlogById).put(updateBlog).delete(deleteBlog);
  router.route('/:blogId/comments').post(addComment);
  router.route('/stats/author-count').get(countBlogsByAuthor);
  router.route('/stats/comment-length').get(averageCommentLength); 
  
  module.exports = router;  