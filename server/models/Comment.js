const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post ID is required']
  },
  content: {
    type: String,
    required: [true, 'Comment content is required']
  },
  author: {
    type: String,
    required: [true, 'Author name is required']
  }
}, {
  timestamps: true
});

// Middleware to update post's comment count after saving
commentSchema.post('save', async function() {
  const Post = mongoose.model('Post');
  await Post.findByIdAndUpdate(this.postId, { $inc: { commentCount: 1 } });
});

// Middleware to update post's comment count after deletion
commentSchema.post('remove', async function() {
  const Post = mongoose.model('Post');
  await Post.findByIdAndUpdate(this.postId, { $inc: { commentCount: -1 } });
});

module.exports = mongoose.model('Comment', commentSchema); 