const express = require('express');
const router = express.Router();
const { postLike, post } = require('../../controllers/like/like.controller');

router.get('/add-like/:id', postLike)
    // router.post('/like/add-like', post)

module.exports = router;