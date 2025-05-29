import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import CreatePost from '../CreatePost/CreatePost';

const Header = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#050A44] via-[#0A21C0] to-[#B3B4BD] shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="text-white">
              <h1 className="text-3xl font-bold">Post & Comments Service</h1>
              <p className="text-gray-200 mt-1">Built with Vicky</p>
            </Link>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="shadow-lg"
          >
            Create New Post
          </Button>
        </div>
      </div>
      
      {isCreateModalOpen && (
        <CreatePost
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </header>
  );
};

export default Header; 