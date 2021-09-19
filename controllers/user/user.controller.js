const User = require("../../models/User");
module.exports = {
  profile: async (req, res) => {
    if (!req.user) {
      req.flash(
        "error-message",
        "Unauthorized! please search for a user using their usernam or password"
      );
      return res.redirect("back");
    }
    
   return res.render("user/user");
  },
  search: async (req, res) => {
    const value = req.body.value;
    let user = await User.findOne({
      $or: [{ email: value }, { username: value }],
    });
    if (!user) {
      req.flash("error-message", "User not found, please try again");
      return res.redirect("back");
    }
    return res.render("user/user", {user})
  },
};
