const randomstring = require("randomstring");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const verifyEmail = require("../../utils/verifyEmail");
module.exports = {
  login: async (req, res) => {
    res.render("auth/login");
  },
  register: async (req, res) => {},
  postRegister: async (req, res) => {
    const { username, password, email } = req.body;
    const googleId = null;
    if (password.length < 6) {
      req.flash("error-message", "Password must be atleast 6 characters long.");
      return res.redirect("back");
    }

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      req.flash("error-message", "Email already exists.");
      return res.redirect("back");
    }

    const usernameAlreadyExists = await User.findOne({ username });
    if (usernameAlreadyExists) {
      req.flash("error-message", "Username already exists.");
      return res.redirect("back");
    }
    const salt = await bcrypt.genSalt(); //uses 10 by default
    const hashedPassword = await bcrypt.hash(password, salt);

    const secretToken = randomstring.generate();

    let user = new User({
      username,
      email,
      googleId,
      password: hashedPassword,
      secretToken,
    });
    await verifyEmail(req, username, email, secretToken);

    await user.save();
    if (!user) {
      req.flash("error-message", "Something went wrong");
      return res.redirect("back");
    }
    req.flash(
      "success-message",
      "Registration successful, a verification token has been sent to your email."
    );
    return res.redirect("/auth/verify-account");
  },
  passwordReset: async (req, res) => {},
  logout: async (req, res) => {},
  postLogin: passport.authenticate("local", {
    successRedirect: "/user/profile",
    failureRedirect: "/auth/login",
    failureFlash: true,
    successFlash: true,
    session: true,
  }),
  verifyUserRegisteredEmail: async (req, res) => {
    let user = await User.findOne({ secretToken: req.params.token });
    if (!user) {
      req.flash(
        "error-message",
        "This token is invalid. Please use a valid token and try again."
      );
      return res.redirect("back");
    }
    user.verified = true;
    await user.save();
    if (!user) {
      req.flash("error-message", "Sorry you are not verified. Please try again.");
      return res.redirect("back");
    }
    req.flash(
      "success-message",
      "Your account has been verified, you can now login"
    );
    return res.redirect("/auth/login");
  },
  verifyToken: async (req, res) => {
    const { token } = req.body;
    let user = await User.findOne({ secretToken: token });
    if (!user) {
      req.flash(
        "error-message",
        "This token is invalid. Please use a valid token and try again."
      );
      return res.redirect("back");
    }
    user.verified = true;
    await user.save();
    if (!user) {
      req.flash(
        "error-message",
        "Sorry you are not verified. Please try again."
      );
      return res.redirect("back");
    }
    req.flash(
      "success-message",
      "Your account has been verified. You can now login."
    );
    return res.redirect("/auth/login");
  },
  verifyMe: async (req, res) => {
    res.render("auth/verify");
  },
};
