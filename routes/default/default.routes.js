const express = require("express");
const router = express.Router();
const { home, completedRegistration, allposts } = require("../../controllers/default/default.controller")

router.get("/", allposts);
router.get("/completed-registration", completedRegistration);

module.exports = router;