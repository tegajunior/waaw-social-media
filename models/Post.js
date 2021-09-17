const mongoose = require("mongoose");
const { Schema } = mongoose;
const postSchema = new Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      }
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comment",
      }
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model('post', postSchema);

module.exports = Post;