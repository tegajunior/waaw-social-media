const Post = require("../../models/Post");

module.exports = {
  postLike: async (req, res) => {
    let { id } = req.params;
    if (!req.user) {
      req.flash(
        "error-message",
        "You have to be logged in to perform this action."
      );
      return res.redirect("/auth/login");
    }
    Post.findById(id, async function (err, post) {
      if (post.likedBy.includes(req.user.id)) {
        req.flash("success-message", "You just unliked a post.");
        await post.likedBy.pull(req.user.id);
        await post.save();
        return res.redirect("back");
      }
      req.flash("success-message", "You just liked a Post.");
      await post.likedBy.push(req.user.id);
      await post.save();
      return res.redirect("back");
    });
  },
  post: async (req, res) => {
    if (!req.user) {
      req.flash(
        "error-message",
        "You have to be logged in to perform this action."
      );
      return res.redirect("/auth/login");
    }
    const filter = { posts: req.params.id };
    const update = { $push: { likedBy: req.user.id } };
    await Post.updateOne(
      filter,
      update,
      { $inc: { likes: 1 } },
      { upsert: true }
    );
  },
};
