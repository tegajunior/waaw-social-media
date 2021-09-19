const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
module.exports = {
  postComment: async(req, res) => {
    if (!req.user) {
      req.flash('error-message','Please sign up to continue');
      return res.redirect('/auth/login');
    }
    const {comment} = req.body;
    let newComment = new Comment({body: comment, user: req.params.userId});
    await newComment.save();
    if (!newComment) {
      req.flash('error-message','Comment not saved');
      return res.redirect("back");
    }
    let co

  },
};
