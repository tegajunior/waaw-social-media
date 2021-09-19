const Post = require("../../models/Post");
module.exports = {
  postPost: async (req, res) => {
    const {body} = req.body;
    let post = new Post({body});
    await post.save();
    if (!post) {
      req.flash("error-message", "Could not save post");
      return res.redirect("back");
    }
    req.flash("success-message", "Post saved successfully");
    res.redirect("back");
  },
};
