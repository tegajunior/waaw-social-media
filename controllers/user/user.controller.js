const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Post");
const arraySort = require('array-sort');
module.exports = {
    profile: async(req, res) => {
        if (!req.user) {
            req.flash(
                "error-message",
                "Unauthorized! please search for a user using their username"
            );
            return res.redirect("back");
        }
        const id = req.user.id;
        const userPosts = await User.findById(id).populate('posts comments');
        let { posts } = userPosts;
        let [{ comments }] = posts;
        // comments = arraySort(comments, ['index'], { reverse: true });
        posts = arraySort(posts, ['createdAt', '_id'], { reverse: true });
        return res.render("user/user", { posts, comments });
    },
    search: async(req, res) => {
        const value = req.body.value;
        let user = await User.findOne({
            $or: [{ email: value }, { username: value }],
        });
        if (!user) {
            req.flash("error-message", "User not found, please try again");
            return res.redirect("back");
        }

        const id = req.user.id;
        const userPosts = await User.findById(id).populate('posts');
        const { posts } = userPosts;

        posts = arraySort(posts, ['createdAt', '_id'], { reverse: true });
        return res.render("user/user", { posts });
    }
};