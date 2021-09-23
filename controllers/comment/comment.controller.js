const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const User = require("../../models/User");
const mongoose = require("mongoose");
module.exports = {
    postComment: async(req, res) => {
        if (!req.user) {
            req.flash('error-message', 'Action not allowed! You have to be logged in to be able to make comments on a post.');
            return res.redirect('/auth/login');
        }
        const { comment } = req.body;
        let { postId } = req.params;
        let userid = mongoose.Types.ObjectId(req.user.id);
        let newComment = new Comment({ body: comment, user: userid });
        await newComment.save();
        if (!newComment) {
            req.flash('error-message', 'Comment not saved');
            return res.redirect("back");
        }
        const postComment = await Post.findById(postId);
        await postComment.comments.unshift(newComment._id);
        await postComment.save();
        const userComment = await User.findById(userid);
        await userComment.comments.unshift(newComment._id);
        await userComment.save();
        return res.redirect("back");
    },

    getComments: async(req, res) => {}
};