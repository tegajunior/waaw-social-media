const express = require('express');
const router = express.Router();

const { postPost, getPosts, deletePost, searchPost } = require("../../controllers/post/post.controller")

router.post("/add-post", postPost);
router.get("/allposts", getPosts);
router.get("/deletepost/:postUser/:postId", deletePost);
router.post("/search", searchPost);

module.exports = router;