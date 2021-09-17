const express = require('express');
const router = express.Router()
const {postComment} = require("../../controllers/comment/comment.controller");

router.post("/add-comment", postComment);

module.exports = router;