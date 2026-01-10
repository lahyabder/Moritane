import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DetailsModal from './components/DetailsModal';
import VideoPlayerModal from './components/VideoPlayerModal';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Live from './pages/Live';
import Shows from './pages/Shows';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminContent from './pages/admin/AdminContent';
import AdminMovies from './pages/admin/AdminMovies';
import AdminSeries from './pages/admin/AdminSeries';
import AdminUsers from './pages/admin/AdminUsers';
import AdminLive from './pages/admin/AdminLive';
import AdminSubscriptions from './pages/admin/AdminSubscriptions';
import AuthModal from './components/AuthModal';
import Subscription from './pages/Subscription';
import SignupOffer from './pages/SignupOffer';
import PartnerRegistration from './pages/partner/PartnerRegistration';
import PartnerDashboard from './pages/partner/PartnerDashboard';

import { trendingMovies, seriesMock, heroMovie } from './data/mockData';

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [playingMovie, setPlayingMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();

  // Close modals on route change (navigation)
  useEffect(() => {
    setSelectedMovie(null);
    setPlayingMovie(null);
    setIsAuthOpen(false);
    // Ensure body scroll is unlocked
    document.body.style.overflow = 'unset';
  }, [location.pathname]);

  // Combine all data for search
  const allContent = useMemo(() => {
    return [heroMovie, ...trendingMovies, ...seriesMock];
  }, []);

  // Filter content based on search query
  const filteredContent = useMemo(() => {
    if (!searchQuery) return null;
    return allContent.filter(item =>
      item.title.includes(searchQuery) ||
      item.category?.includes(searchQuery)
    );
  }, [searchQuery, allContent]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handlePlayClick = (movie) => {
    setPlayingMovie(movie);
    // If details modal was open, close it
    setSelectedMovie(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
  };

  return (
    <>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="movies" element={<AdminMovies />} />
          <Route path="series" element={<AdminSeries />} />
          <Route path="live" element={<AdminLive />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="subscriptions" element={<AdminSubscriptions />} />
          <Route path="settings" element={<div style={{ color: 'white' }}>Work in progress...</div>} />
        </Route>

        {/* Partner Routes */}
        <Route path="/partner/register" element={<PartnerRegistration />} />
        <Route path="/partner/dashboard" element={<PartnerDashboard />} />

        {/* User Routes */}
        <Route path="*" element={
          <div className="app">
            <Navbar
              onSearch={setSearchQuery}
              onLoginClick={() => setIsAuthOpen(true)}
              user={user}
              onLogout={() => setUser(null)}
            />

            {searchQuery ? (
              <div className="search-results-container" style={{ minHeight: '80vh', paddingTop: '100px', paddingLeft: '2rem', paddingRight: '2rem' }}>
                <h2 style={{ marginBottom: '2rem' }}>نتائج البحث عن: "{searchQuery}"</h2>
                {filteredContent.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
                    {filteredContent.map(item => (
                      <div key={item.id} onClick={() => handleMovieClick(item)} style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
                        <img src={item.image} alt={item.title} style={{ width: '100%', borderRadius: '8px', aspectRatio: '2/3', objectFit: 'cover' }} />
                        <h3 style={{ marginTop: '0.5rem', fontSize: '1rem' }}>{item.title}</h3>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', marginTop: '4rem', color: '#666' }}>
                    <h3>لا توجد نتائج</h3>
                    <p>حاول البحث بكلمات مختلفة</p>
                  </div>
                )}
              </div>
            ) : (
              <Routes>
                <Route path="/" element={<Home onMovieClick={handleMovieClick} onPlayClick={handlePlayClick} />} />
                <Route path="/movies" element={<Movies onMovieClick={handleMovieClick} />} />
                <Route path="/series" element={<Series onMovieClick={handleMovieClick} />} />
                <Route path="/live" element={<Live />} />
                <Route path="/shows" element={<Shows onMovieClick={handleMovieClick} />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/signup-offer" element={<SignupOffer />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            )}

            <div style={{ height: '50px' }}></div> {/* Spacing */}
            <Footer />

            {selectedMovie && (
              <DetailsModal
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)}
                onPlay={() => handlePlayClick(selectedMovie)}
              />
            )}

            {playingMovie && (
              <VideoPlayerModal
                movie={playingMovie}
                onClose={() => setPlayingMovie(null)}
              />
            )}

            <AuthModal
              isOpen={isAuthOpen}
              onClose={() => setIsAuthOpen(false)}
              onLogin={handleLogin}
            />
          </div>
        } />
      </Routes>
    </>
  );
}

export default App;
