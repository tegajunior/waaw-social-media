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
    verifyToken,
    verifyMe
} = require("../../controllers/auth/auth.controller");

router.route("/login").get(login).post(postLogin);

router.route("/register").get(register).post(postRegister);

router.get("/logout", logout);

router.get("/password-reset", passwordReset);

router.get("/verify-account/:token", verifyUserRegisteredEmail);

router.route("/verify-account").get(verifyMe).post(verifyToken)

// router.post("/verify-account", verifyToken)




module.exports = router;