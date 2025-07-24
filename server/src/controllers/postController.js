const Post = require('@src/models/Post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username avatar').sort('-createdAt');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const post = new Post({
      author: req.user._id,
      content,
      image
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      { content, image },
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found or you are not authorized to edit it' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    if (!post) {
      return res.status(404).json({ message: 'Post not found or you are not authorized to delete it' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};