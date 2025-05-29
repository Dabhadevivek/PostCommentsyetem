import React, { useState, useRef } from 'react';
import { usePosts } from '../../context/PostContext';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { parseMarkdown } from '../../utils/textUtils';

const CreatePost = ({ onClose }) => {
  const { createPost } = usePosts();
  const textareaRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    authorRole: 'User'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const applyFormatting = (type) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    
    if (selectedText) {
      const prefix = type === 'bold' ? '**' : '*';
      const beforeText = formData.content.substring(0, start);
      const afterText = formData.content.substring(end);
      const newContent = beforeText + prefix + selectedText + prefix + afterText;
      
      setFormData(prev => ({
        ...prev,
        content: newContent
      }));

      // Restore focus and selection after state update
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + prefix.length,
          end + prefix.length
        );
      }, 0);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.author.trim()) newErrors.author = 'Author name is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await createPost(formData);
      onClose();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatHelp = (
    <div className="text-sm text-gray-500 mt-1">
      <p>Formatting options:</p>
      <ul className="list-disc list-inside ml-2 space-y-1">
        <li><code className="bg-gray-100 px-1 rounded">**bold**</code> for <strong>bold text</strong></li>
        <li><code className="bg-gray-100 px-1 rounded">*italic*</code> for <em>italic text</em></li>
        <li><code className="bg-gray-100 px-1 rounded">[link text](url)</code> for <a href="#" className="text-purple-600 hover:text-purple-800">links</a></li>
      </ul>
    </div>
  );

  return (
    <Modal title="Create New Post" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          required
          placeholder="Enter post title"
        />

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-gray-700 text-sm font-medium">
              Content<span className="text-red-500 ml-1">*</span>
            </label>
            <Button
              type="button"
              variant="outline"
              className="text-sm px-3 py-1"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>

          {showPreview ? (
            <div className="prose max-w-none p-4 border rounded-lg min-h-[120px] bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{formData.title || 'Untitled'}</h2>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(formData.content) || 'No content yet...' }}
              />
            </div>
          ) : (
            <>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => applyFormatting('bold')}
                  className="w-8 h-8 flex items-center justify-center bg-[#0A21C0] text-white rounded hover:bg-[#050A44] font-bold transition-colors"
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting('italic')}
                  className="w-8 h-8 flex items-center justify-center bg-[#0A21C0] text-white rounded hover:bg-[#050A44] italic transition-colors"
                  title="Italic"
                >
                  I
                </button>
              </div>
              <textarea
                ref={textareaRef}
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your post content here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[120px]"
                required
              />
              {formatHelp}
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Author Name"
            name="author"
            value={formData.author}
            onChange={handleChange}
            error={errors.author}
            required
            placeholder="Your name"
          />

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Author Role
            </label>
            <select
              name="authorRole"
              value={formData.authorRole}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
            </select>
          </div>
        </div>

        {errors.submit && (
          <p className="text-red-500 text-sm mb-4">{errors.submit}</p>
        )}

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Post'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePost; 