const mongoose = require('mongoose');
const User = require('./User')

const likeschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    post: { 
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },

    postLike: Boolean
    
  });

const Like = mongoose.model('Like', likeschema);

module.exports = Like;