const randomstring = require("randomstring");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../../models/User");
const verifyEmail = require("../../utils/verifyEmail");
const resetPasswordEmail = require("../../utils/resetPasswordEmail");
var toonavatar = require('cartoon-avatar');
const url = toonavatar.generate_avatar();
module.exports = {
    login: async(req, res) => {
        res.render("auth/login");
    },
    register: async(req, res) => {
        res.render('defaults/index')
    },
    postRegister: async(req, res) => {
        const { username, password, email } = req.body;
        let avatar = Array.from(username);
        avatar = (avatar[0] + avatar[1]).toUpperCase();
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
            userImage: url,
            initials: avatar
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
    resetPassword: async(req, res) => {
        const { userId } = req.params;
        let user = await User.findById(userId);
        if (!user) {
            req.flash("error-message", "Account not found, please signup");
            return res.redirect("/auth/register");
        }
        req.flash(
            "success-message",
            "Please enter your new passssword and confirm"
        );
        res.render("auth/resetpassword", { userId });
    },
    postResetPassword: async(req, res) => {
        const { newPassword, confirmNewPassword } = req.body;
        let { userId } = req.params;
        //console.log(req.body.confirmNewpassword);
        if (newPassword.length < 6) {
            req.flash("error-message", "Password must be at least 6 characters");
            return res.redirect("back");
        }
        if (newPassword !== confirmNewPassword) {
            req.flash(
                "error-message",
                "Password mismatch, please retype your password"
            );
            return res.redirect("back");
        }
        const salt = await bcrypt.genSalt(); //uses 10 by default
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        userId = mongoose.Types.ObjectId(userId);
        let user = await User.findOne({ _id: userId });
        if (!user) {
            req.flash("error-message", "User not found");
            return res.redirect("back");
        }
        user.password = hashedPassword;
        await user.save();
        if (!user) {
            req.flash("error-message", "Something went wrong");
            return res.redirect("back");
        }
        req.flash(
            "success-message",
            "Password has been updated, Please login again"
        );
        console.log(req.body);
        return res.redirect("/auth/login");
    },
    forgotPassword: async(req, res) => {
        res.render("auth/forgotpassword");
    },
    postForgotPassword: async(req, res) => {
        const { email } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            req.flash("error-message", "User with the email not found");
            return res.redirect("back");
        }
        console.log(user);
        const userId = user._id;
        const username = user.username;

        await resetPasswordEmail(req, username, email, userId);

        req.flash(
            "success-message",
            "Password reset link has been sent to your email address"
        );
        res.redirect("back");
    },
    logout: async(req, res) => {
        req.logout();
        req.flash("success-message", "We will be glad to have you back.")
        res.redirect("/auth/login");
    },
    postLogin: passport.authenticate("local", {
        successRedirect: "/user/profile",
        failureRedirect: "/auth/login",
        failureFlash: true,
        successFlash: true,
        session: true,
    }),
    verifyUserRegisteredEmail: async(req, res) => {
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
    verifyToken: async(req, res) => {
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
    verifyMe: async(req, res) => {
        res.render("auth/verify");
    },
    google: passport.authenticate('google', { scope: ['profile', 'email'] }),
};