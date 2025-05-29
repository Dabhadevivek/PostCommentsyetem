import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { parseMarkdown, formatDate, createExcerpt } from '../../utils/textUtils';

const PostCard = ({ post }) => {
  const {
    _id,
    title,
    content,
    author,
    authorRole,
    createdAt,
    commentCount
  } = post;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <article 
      className={`bg-white rounded-lg shadow-lg p-6 mb-6 transform transition-all duration-300 ${
        isHovered ? 'scale-[1.02] shadow-xl' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <header className="mb-4">
        <Link to={`/post/${_id}`}>
          <h2 className="text-2xl font-bold text-gray-800 hover:text-purple-600 transition-colors duration-200">
            {title}
          </h2>
        </Link>
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="font-medium text-purple-600">{author}</span>
            {authorRole && (
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                authorRole === 'Admin' 
                  ? 'bg-purple-100 text-purple-700'
                  : authorRole === 'Moderator'
                  ? 'bg-cyan-100 text-cyan-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {authorRole}
              </span>
            )}
          </div>
          <span className="mx-2 text-gray-400">•</span>
          <time className="text-gray-500">{formatDate(createdAt)}</time>
        </div>
      </header>

      <div 
        className="prose max-w-none mb-4 text-gray-600 leading-relaxed"
        dangerouslySetInnerHTML={{ 
          __html: parseMarkdown(createExcerpt(content)) 
        }}
      />

      <footer className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <Link
          to={`/post/${_id}`}
          className="text-purple-600 hover:text-purple-700 font-medium flex items-center transition-colors duration-200"
        >
          Read More
          <svg 
            className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${
              isHovered ? 'translate-x-1' : ''
            }`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        <div className="flex items-center text-gray-500 hover:text-purple-600 transition-colors duration-200">
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <span>{commentCount} comments</span>
        </div>
      </footer>
    </article>
  );
};

export default PostCard; 