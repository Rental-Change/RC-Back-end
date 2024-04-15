const express = require('express');
const router = express.Router();
const Post = require('../Models/Post');
const upload = require('../middlewares/uploads');

// Route to create a new post
router.post('/posts', upload.single('image'), async (req, res) => {
  try {
    const { user, title, content, tag } = req.body;
    const imagePath = req.file.path; // Get the path to the uploaded image
    const newPost = new Post({ user, title, image: imagePath, content, tag });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
