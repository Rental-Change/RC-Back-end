<<<<<<< HEAD
//Post.js
const mongoose = require('mongoose');
const User = require('./User')
=======
const mongoose = require('mongoose');
const User = require('./User');
>>>>>>> 768ced843bdc2d8e095a03a448cee0f9c62c51e9

const postSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
<<<<<<< HEAD
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
        fileName: String,
        contentType: String,
        filePath: String,
    },

    postLike: Boolean,

=======
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
>>>>>>> 768ced843bdc2d8e095a03a448cee0f9c62c51e9
  });

const Post = mongoose.model('Post', postSchema);

<<<<<<< HEAD
module.exports = Post;
=======
module.exports = Post;
>>>>>>> 768ced843bdc2d8e095a03a448cee0f9c62c51e9
