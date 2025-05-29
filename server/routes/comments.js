const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Get comments for a post
router.get('/posts/:postId/comments', commentController.getComments);

// Add comment to post
router.post('/posts/:postId/comments', commentController.createComment);

// Update comment
router.put('/comments/:id', commentController.updateComment);

// Delete comment
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router; 