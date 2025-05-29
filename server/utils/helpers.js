// Format date to a readable string
exports.formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Parse markdown-style formatting
exports.parseMarkdown = (text) => {
  if (!text) return '';
  
  // Replace bold
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Replace italic
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Replace links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  return text;
};

// Sanitize user input
exports.sanitizeInput = (text) => {
  if (!text) return '';
  return text
    .trim()
    .replace(/[<>]/g, '') // Remove < and > characters
    .slice(0, 5000); // Limit text length
}; 