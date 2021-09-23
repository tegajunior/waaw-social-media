const Post = require("../../models/Post");
const User = require("../../models/User");
const Comment = require("../../models/Comment");
const arraySort = require('array-sort');
module.exports = {
    postPost: async(req, res) => {

        if (!req.user) {
            req.flash('error-message', 'You must be logged in to create a post.')
            return res.redirect("/auth/login")
        }
        const { body } = req.body;

        let post = new Post({ body, user: req.user.username || req.user.name, userImage: req.user.userImage });
        console.log(req.user.userImage);
        await post.save();
        if (!post) {
            req.flash("error-message", "Could not save post");
            return res.redirect("back");
        }
        req.flash("success-message", "Post saved successfully");

        const filter = { _id: req.user._id };
        const update = { $push: { posts: post._id } };
        await User.updateOne(filter, update, { upsert: true });
        res.redirect("back");
    },
    getPosts: async(req, res) => {
        let posts = await Post.find().populate({ path: 'comments', model: 'comment', populate: { path: 'user', model: 'user' } }).populate({ path: 'likedBy', model: 'user' });
        posts = arraySort(posts, ['createdAt', '_id'], { reverse: true });

        res.render("defaults/post", { posts })
    }
};