const User = require("../../models/User");
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
        const userPosts = await User.findById(id).populate('posts');
        const { posts } = userPosts;
        return res.render("user/user", { posts });
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
        const posts = user.posts
        return res.render("user/user", { posts, user })
    },
};