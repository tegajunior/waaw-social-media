const findOrCreate = require("mongoose-findorcreate")
const mongoose = require('mongoose');
const {Schema} =  mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "post",
      },
    ],
    secretToken: {
      type: String,
    },
    googleId: {
      type: String,
    },
    name: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.plugin(findOrCreate);
const User = mongoose.model("user", userSchema);

module.exports = User;