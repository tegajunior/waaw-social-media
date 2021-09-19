const Post = require("../../models/Post");
const User = require("../../models/User");
module.exports = {
    postPost: async(req, res) => {
        const { body } = req.body;
        let post = new Post({ body });
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
};