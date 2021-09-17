const express = require("express");
const router = express.Router();
const {
  login,
  register,
  postLogin,
  postRegister,
  logout,
  passwordReset,
  verifyUserRegisteredEmail,
} = require("../../controllers/auth/auth.controller");

router.route("/login").get(login).post(postLogin);

router.route("/register").get(register).post(postRegister);

router.get("/logout", logout);

router.get("/password-reset", passwordReset);

router.get("/verify-account/:token", verifyUserRegisteredEmail);

module.exports = router;
