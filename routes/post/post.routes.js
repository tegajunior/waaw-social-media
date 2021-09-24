const express = require('express');
const router = express.Router();

const { postPost, getPosts, deletePost } = require("../../controllers/post/post.controller")

router.post("/add-post", postPost);
router.get("/allposts", getPosts);
router.get("/deletepost/:postUser/:postId", deletePost);

module.exports = router;