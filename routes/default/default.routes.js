const express = require("express");
const router = express.Router();
const { home, completedRegistration } = require("../../controllers/default/default.controller")

router.get("/", home);
router.get("/completed-registration", completedRegistration);

module.exports = router;
