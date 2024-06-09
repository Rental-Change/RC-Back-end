
//Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    userID: { 
        type: String, 
        required: true 
    },
    userName: { 
        type: String, 
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
    postImage: { 
        data: Buffer,
        fileName: String,
        contentType: String,
        filePath: String,
    },

    postStatus: { 
        type: String 
    },
  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
