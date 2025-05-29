import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PostProvider } from './context/PostContext';
import Header from './components/Header/Header';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <PostProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-[#050A44] via-[#0A21C0] to-[#B3B4BD]">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
          </main>
    </div>
      </Router>
    </PostProvider>
  );
}

export default App;
