// Convert markdown syntax to HTML with enhanced formatting
export const parseMarkdown = (text) => {
  if (!text) return '';

  // Escape HTML characters first
  text = text.replace(/[&<>"']/g, char => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return entities[char];
  });

  // Replace bold text (handle nested formatting)
  text = text.replace(/\*\*(.*?)\*\*/g, (match, content) => {
    // Process nested italic inside bold
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
    return `<strong>${content}</strong>`;
  });

  // Replace remaining italic text
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Replace links with secure attributes
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:text-purple-800 underline">$1</a>'
  );

  // Convert line breaks to <br>
  text = text.replace(/\n/g, '<br>');

  return text;
};

// Format date to readable string with custom styling
export const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

// Create excerpt from long text with smart truncation
export const createExcerpt = (text, maxLength = 150) => {
  if (!text) return '';
  
  // Remove HTML tags for excerpt
  const plainText = text.replace(/<[^>]*>/g, '');
  
  if (plainText.length <= maxLength) return plainText;
  
  // Try to break at a space to avoid cutting words
  const truncated = plainText.substr(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substr(0, lastSpace) + '...' : truncated + '...';
}; 