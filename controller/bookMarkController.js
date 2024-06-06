const Post = require('../Models/Post');
const User = require('../Models/User');
const BookMark = require('../Models/BookMark');
const mongoose = require('mongoose');

exports.addBookMark = async (req, res, next) => {
    try {
        const { userID, postID } = req.body;

        // Find user and post by ID
        const user = await User.findOne({ user_ID: userID });
        const post = await Post.findById( postID );

        if (!user || !post) {
            return res.status(404).json({ msg: 'User or Post not found' });
        }

        // Check if the bookmark already exists
        const existingLike = await Like.findOne({ user: user._id, post: post._id });
        if (existingLike) {
            return res.status(400).json({ msg: 'Bookmark already exists' });
        }

        // Create a new bookmark
        const bookmark = new BookMark({
            user: user._id,
            post: post._id,
            postLike: true,
        });

        await bookmark.save();
        res.status(201).json({ msg: 'Bookmark added successfully' });

    } catch (err) {
        next(err);
    }
};

exports.deleteBookMark = async (req, res, next) => {
    const { userID, postID } = req.body;
    try {
        const user = await User.findOne({ user_ID: userID });
        const post = await Post.findById( postID );

        if (!user || !post) {
            return res.status(404).json({ msg: 'User or Post not found' });
        }

        // Remove the bookmark
        const deleteresult = await BookMark.deleteOne({ user: user._id, post: post._id });

        if (deleteresult.deletedCount === 0) {
            return res.status(404).json({ msg: 'Bookmark not found' });
        }

        res.status(200).json({ msg: 'Bookmark deleted successfully' });

    } catch (err) {
        next(err);
    }
};