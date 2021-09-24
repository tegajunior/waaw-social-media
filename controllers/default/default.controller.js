const Post = require("../../models/Post");
const User = require("../../models/User");
const Comment = require("../../models/Comment");
const arraySort = require('array-sort');
module.exports = {
    home: (req, res) => {
        res.render("defaults/post");
    },
    completedRegistration: (req, res) => {},
    allposts: async(req, res) => {
        let posts = await Post.find().populate({ path: 'comments', model: 'comment', populate: { path: 'user', model: 'user' } }).populate({ path: 'likedBy', model: 'user' });
        posts = arraySort(posts, ['createdAt', '_id'], { reverse: true });

        res.render("defaults/post", { posts })
    }
};