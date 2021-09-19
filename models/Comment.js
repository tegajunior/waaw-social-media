const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
  body: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  }
}, {timestamps: true,});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;