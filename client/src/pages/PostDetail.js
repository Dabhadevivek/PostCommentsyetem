import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost, getComments, createComment } from '../services/api';
import { parseMarkdown, formatDate } from '../utils/textUtils';
import CommentSection from '../components/CommentSection/CommentSection';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postData, commentsData] = await Promise.all([
          getPost(id),
          getComments(id)
        ]);
        setPost(postData.data);
        setComments(commentsData.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddComment = async (commentData) => {
    try {
      const response = await createComment(id, commentData);
      setComments(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-red-500 mb-4">Error: {error || 'Post not found'}</div>
        <Link to="/" className="text-purple-600 hover:text-purple-700 font-medium">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Post */}
      <article className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-medium text-purple-600">{post.author}</span>
              {post.authorRole && (
                <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                  {post.authorRole}
                </span>
              )}
            </div>
            <span className="mx-2">•</span>
            <time>{formatDate(post.createdAt)}</time>
          </div>
        </header>

        <div 
          className="prose max-w-none mb-6"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
        />

        <Link to="/" className="text-purple-600 hover:text-purple-700 font-medium">
          ← Back to Home
        </Link>
      </article>

      {/* Comments Section */}
      <CommentSection
        postId={id}
        comments={comments}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default PostDetail; 