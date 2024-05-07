const mongoose = require('mongoose');
const User = require('./User')

const postSchema = new mongoose.Schema({
    User,
    title: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String,
        required: true 
    },
    content: { 
        type: String },
  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
