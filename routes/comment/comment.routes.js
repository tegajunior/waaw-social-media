const express = require("express");
const router = express.Router();
const {
  postComment,
  postCommentsToComments,
} = require("../../controllers/comment/comment.controller");

router.post("/add-comment/:postId", postComment);
router.post("/reply-comment/:commentId", postCommentsToComments);

module.exports = router;
