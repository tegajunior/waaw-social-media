const Post = require("../../models/Post");
const User = require("../../models/User");

module.exports = {

    postLike: async(req, res) => {
        const { id } = req.params
        if (!req.user) {
            req.flash('error-message', 'You have to be logged in to perform this action.')
            return res.redirect('/auth/login')
        }
        const postLike = await Post.findById(id);
        postLike.likedBy.push(id);
        postLike.save();
        // await Post.findById(id, function(err, res) {

        //     })
        // postLike.update({ id }, { $inc: { likes: 1 } })


        return res.redirect("back")

    },
    post: async(req, res) => {
        if (!req.user) {
            req.flash('error-message', 'You have to be logged in to perform this action.')
            return res.redirect('/auth/login')
        }
        const filter = { posts: req.params.id };
        const update = { $push: { likedBy: req.params.id } };
        await Post.updateOne(filter, update, { $inc: { likes: 1 } }, { upsert: true });
    }

}