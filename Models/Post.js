//Post.js
const mongoose = require('mongoose');

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
        fileName: String,
        contentType: String,
        filePath: String,
    },

    postLike: Boolean,

  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;