import React, { useState, useRef } from 'react';
import { parseMarkdown } from '../../utils/textUtils';

const CommentSection = ({ postId, comments = [], onAddComment }) => {
  const textareaRef = useRef(null);
  const [newComment, setNewComment] = useState({
    content: '',
    author: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const applyFormatting = (type) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = newComment.content.substring(start, end);
    
    if (selectedText) {
      const prefix = type === 'bold' ? '**' : '*';
      const beforeText = newComment.content.substring(0, start);
      const afterText = newComment.content.substring(end);
      const newContent = beforeText + prefix + selectedText + prefix + afterText;
      
      setNewComment(prev => ({
        ...prev,
        content: newContent
      }));

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + prefix.length,
          end + prefix.length
        );
      }, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!newComment.content.trim()) errors.content = 'Comment is required';
    if (!newComment.author.trim()) errors.author = 'Name is required';

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true);
      await onAddComment({
        ...newComment,
        postId
      });
      setNewComment({ content: '', author: '' });
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Add a Comment<span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => applyFormatting('bold')}
                className="w-8 h-8 flex items-center justify-center bg-[#0A21C0] text-white rounded hover:bg-[#050A44] font-bold transition-colors"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => applyFormatting('italic')}
                className="w-8 h-8 flex items-center justify-center bg-[#0A21C0] text-white rounded hover:bg-[#050A44] italic transition-colors"
              >
                I
              </button>
            </div>
            <textarea
              ref={textareaRef}
              name="content"
              value={newComment.content}
              onChange={handleChange}
              placeholder="Write your comment..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[120px]"
              required
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="author"
            value={newComment.author}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author}</p>
          )}
        </div>

        {errors.submit && (
          <p className="text-red-500 text-sm mb-4">{errors.submit}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-cyan-400 text-white rounded-lg hover:bg-cyan-500 disabled:opacity-50 font-medium"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-gray-50 rounded-lg shadow p-4">
            <div
              className="prose max-w-none mb-2"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(comment.content) }}
            />
            <div className="text-sm text-gray-500">
              <span className="font-medium text-purple-600">{comment.author}</span>
              <span className="mx-2">•</span>
              <time>{new Date(comment.createdAt).toLocaleDateString()}</time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection; 