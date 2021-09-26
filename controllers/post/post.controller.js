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

        let post = new Post({ body, user: req.user.username || req.user.name, userImage: req.user.userImage, userId: req.user.id });
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
    },
    deletePost: async(req, res) => {
        let { postId, postUser } = req.params;
        if (!req.user) {
            req.flash('error-message', "You don't have permission to delete this post.")
            return res.redirect("back")
        }
        if (req.user.id != postUser) {
            req.flash('error-message', "You don't have permission to delete another user's post.")
            return res.redirect("back")
        }

        await Post.findByIdAndDelete(postId).then(() => {
            req.flash('success-message', 'Post deleted successfully')
            return res.redirect("back");
        })

    },

    searchPost: async(req, res) => {
        const { search } = req.body;
        Post.find({ $text: { $search: search } }, (function(err, searchedposts) {
            if (!err) {
                if (searchedposts == []) {
                    req.flash('success-message', 'No Post Found!')
                    return res.redirect("/post/search");
                }
                return res.render('defaults/searchedposts', { searchedposts })
            }

        }))

    }
};