//Post.js
const mongoose = require('mongoose');
const User = require('./User')

const postSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    postTitle: { 
        type: String, 
        required: true 
    },
    postAmount: { 
        type: String 
    },
    postPeriod: { 
        type: String 
    },
    postContent: { 
        type: String 
    },
    postStatus: { 
        type: String 
    },
    postImage: { 
        data: Buffer,
        contentType: String,
    },

    postLike: Boolean,

  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;