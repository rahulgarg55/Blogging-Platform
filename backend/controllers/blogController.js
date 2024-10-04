const blog = require('../models/Blog'); 
const Comment = require('../models/Comment');   
const createBlog = async (req, res) => {
    const { title, content, author, tags } = req.body;
    try {
      const blog = new Blog({ title, content, author, tags });
      await blog.save();
      res.status(201).json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  const getAllBlogs = async (req,res)=>{
    const {page=1,limit=10,tags,sortBy='createdAt'}= req.query; 
    try{
        const query =tags? {tags:{$in:tags.split(',')}}: {};
        const blogs = await Blog.find(query)
        .sort({[sortBy]:-1})
        .skipt((page-1)*limit)
        .limit(parseInt(limit));
        const total = await Blog.countDocuments(query);
        res.json({total,blogs});   
    }catch(error){
        res.status(500).json({message:error.message});
    }
  };
  const getBlogById = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id).populate('comments');
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const updateBlog = async (req, res) => {
    try {
      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const deleteBlog  = async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id);
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
      res.json({ message: 'Blog deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const addComment = async (req, res) => {  
    const { text, author } = req.body;  
    try{
        const comment = new Comment ({text, author, blog:req.params.blogId});
        await comment.save();  
        const blog = await Blog.findById(req.params.blogId);   
        blog.comments.push(comment._id);
        await blog.save();

        res.status(201).json(comment);  
    }catch(error){
        res.status(400).json({message:error.message});  
    }
};

const countBlogsByAuthor = async(req,res)=>{
    try{
        const counts = await Blog.aggregate([
            {$group:{_id:'$author', count:{$sum:1}}}, 
            {$sort:{count:-1}},

        ]);
        res.json(counts);
    }catch(error){
        res.status(500).json({message:error.message});
    }   
};

const averageCommentLength = async(req,res)=>{
    try{
        const average = await Comment.aggregate([
            {$group:{_id:'$blog',avgLength:{$avg:{$strLenCP:'$text'}}}},    
        ]);
        res.json(average);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

module.exports= {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    addComment,
    countBlogsByAuthor,
    averageCommentLength,
};  