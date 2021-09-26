const mongoose = require("mongoose");
const { Schema } = mongoose;
const postSchema = new Schema({
    body: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    user: {
        type: String
    },
    userImage: {
        type: String
    },
    userId: {
        type: String
    },
    likedBy: [{
        type: mongoose.Types.ObjectId,
        ref: "user"
    }],
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "comment"

    }],
}, { timestamps: true });

postSchema.index({ body: 'text' });

const Post = mongoose.model('post', postSchema);

module.exports = Post;