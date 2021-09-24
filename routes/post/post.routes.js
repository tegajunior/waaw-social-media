const express = require('express');
const router = express.Router();

const { postPost, getPosts } = require("../../controllers/post/post.controller")

router.post("/add-post", postPost);
router.get("/allposts", getPosts);

module.exports = router;