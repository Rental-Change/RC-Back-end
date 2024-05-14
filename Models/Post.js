//Post.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false 
        },
    postTitle: { 
        type: String, 
        required: true 
    },
    postContent: { 
        type: String 
    },
    postImage: { 
        data: Buffer,
        contentType: String,
    },
    postStatus: String,

    postLike: Boolean,

  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;