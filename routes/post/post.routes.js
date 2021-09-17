const express = require('express');
const router = express.Router();

const {postPost} = require("../../controllers/post/post.controller")

router.post("/add-post", postPost);

module.exports = router;