const { body, validationResult } = require('express-validator');

exports.validatePost = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('author').trim().notEmpty().withMessage('Author name is required'),
  body('authorRole').optional().isIn(['User', 'Admin', 'Moderator']).withMessage('Invalid author role'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateComment = [
  body('content').trim().notEmpty().withMessage('Comment content is required'),
  body('author').trim().notEmpty().withMessage('Author name is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]; 