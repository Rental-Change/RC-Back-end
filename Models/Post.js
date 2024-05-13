//Post.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User')

const postSchema = new mongoose.Schema({
    user_ID: { 
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true 
        },
    postTitle: { 
        type: String, 
        required: true 
    },
    postContent: { 
        type: String 
    },
    postImage: { 
        type: String,
        required: true 
    },
    postStatus: {
        type: String,
        required: true
    },
    postFavorites: {
        type: String,
        required: true
    },

  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
