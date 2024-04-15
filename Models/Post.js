const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true 
        },
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
    tag: { 
        type: String 
    }
  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
