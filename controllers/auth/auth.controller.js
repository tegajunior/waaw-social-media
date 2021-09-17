const randomstring = require("randomstring");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const verifyEmail = require("../../utils/verifyEmail");
module.exports = {
  login: async (req, res) => {},
  register: async (req, res) => {},
  postRegister: async (req, res) => {
    const { username, password, email } = req.body;
    if (password.length < 6) {
      req.flash("error-message", "Password must be atleast 6 characters long");
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
      "Registration successful,a verification link has been to your email"
    );
    return res.redirect("/completed-registration");
  },
  passwordReset: async (req, res) => {},
  logout: async (req, res) => {},
  postLogin: () => {
    require("../../startup/passportSetup")();
    passport.authenticate("local", {
      successRedirect: "/user/profile",
      failureRedirect: "/auth/login",
      failureFlash: true,
      successFlash: true,
      session: true,
    });
  },
};
