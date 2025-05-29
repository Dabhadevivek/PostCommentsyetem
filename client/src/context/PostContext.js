import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/posts', postData);
      setPosts(prevPosts => [response.data, ...prevPosts]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const addComment = async (postId, commentData) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/comments`, commentData);
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post._id === postId 
            ? { ...post, commentCount: post.commentCount + 1 }
            : post
        )
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{
      posts,
      loading,
      error,
      fetchPosts,
      createPost,
      addComment
    }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
}; 