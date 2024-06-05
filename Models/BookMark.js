const mongoose = require('mongoose');

const BookMarkschema = new mongoose.Schema({
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
    
  });

const BookMark = mongoose.model('Like', BookMarkschema);

module.exports = BookMark;