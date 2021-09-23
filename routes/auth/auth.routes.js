const express = require("express");
const router = express.Router();
const {
    login,
    register,
    postLogin,
    postRegister,
    logout,
    passwordReset,
    forgotPassword,
    verifyUserRegisteredEmail,
    verifyToken,
    verifyMe,
    google,
} = require("../../controllers/auth/auth.controller");

router.route("/login").get(login).post(postLogin);

router.route("/register").get(register).post(postRegister);

router.get("/logout", logout);

router.get("/password-reset", passwordReset);

router.get("/forgot-password", forgotPassword);


router.get("/verify-account/:token", verifyUserRegisteredEmail);

router.route("/verify-account").get(verifyMe).post(verifyToken);
router.get("/google", google);
// router.post("/verify-account", verifyToken)




module.exports = router;