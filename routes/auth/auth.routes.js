const express = require("express");
const router = express.Router();
const {
  login,
  register,
  postLogin,
  postRegister,
  logout,
  verifyUserRegisteredEmail,
  verifyToken,
  verifyMe,
  google,
  resetPassword,
  forgotPassword,
  postForgotPassword,
  postResetPassword,
} = require("../../controllers/auth/auth.controller");

router.route("/login").get(login).post(postLogin);

router.route("/register").get(register).post(postRegister);

router.get("/logout", logout);

router.get("/reset-password/:userId", resetPassword);
router.post("/reset-password/:userId", postResetPassword)

router.route("/forgot-password").get(forgotPassword).post(postForgotPassword);

router.get("/verify-account/:token", verifyUserRegisteredEmail);

router.route("/verify-account").get(verifyMe).post(verifyToken);
router.get("/google", google);

module.exports = router;
