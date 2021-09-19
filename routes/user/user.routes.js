const express = require("express");
const router = express.Router();
const { profile, search } = require("../../controllers/user/user.controller")

router.get("/profile", profile);
router.post("/search", search);

module.exports = router;
