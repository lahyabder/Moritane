import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, Bell, X, User, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onSearch, user, onLoginClick, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleSearch = () => {
    if (isSearchOpen) {
      // Closing search
      setIsSearchOpen(false);
      onSearch(''); // Clear search results
    } else {
      setIsSearchOpen(true);
    }
  };

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <div className="navbar-right">
          <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <img src="/logo_new.png" alt="Moritane" style={{ height: '40px', objectFit: 'contain' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'Arial', letterSpacing: '-1px' }}>
              <span style={{ color: '#ffffff' }}>موري</span><span style={{ color: '#F68B2D' }}>تان</span>
            </span>
          </Link>

          {!isSearchOpen && (
            <ul className="nav-links">
              <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>الرئيسية</NavLink></li>
              <li><NavLink to="/live" className={({ isActive }) => isActive ? "active" : ""}>مباشر <span className="live-dot"></span></NavLink></li>
              <li><NavLink to="/series" className={({ isActive }) => isActive ? "active" : ""}>مسلسلات</NavLink></li>
              <li><NavLink to="/movies" className={({ isActive }) => isActive ? "active" : ""}>أفلام</NavLink></li>
              <li><NavLink to="/shows" className={({ isActive }) => isActive ? "active" : ""}>برامج</NavLink></li>
              <li><NavLink to="/partner/register" className={({ isActive }) => isActive ? "active highlight" : "highlight"} style={{ color: '#ffd700' }}>كن شريكاً</NavLink></li>
            </ul>
          )}
        </div>

        {isSearchOpen && (
          <div className="search-bar-container">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="ابحث عن فيلم، مسلسل، أو برنامج..."
              className="search-input"
              onChange={handleSearchChange}
            />
          </div>
        )}

        <div className="navbar-left">
          <button className="icon-btn" onClick={toggleSearch}>
            {isSearchOpen ? <X size={22} /> : <Search size={22} />}
          </button>
          {!isSearchOpen && (
            <>
              <button className="icon-btn"><Bell size={22} /></button>

              {user ? (
                <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Link to="/subscription" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', background: 'goldenrod', color: 'black' }}>
                    ترقية الحساب
                  </Link>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {user.name.charAt(0)}
                    </div>
                  </div>
                  <button className="icon-btn" onClick={onLogout} title="تسجيل الخروج">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/subscription" className="btn" style={{ color: '#dbb42c', border: '1px solid #dbb42c', padding: '0.4rem 1rem', marginRight: '0.5rem' }}>اشترك الآن</Link>
                  <button className="btn btn-primary login-btn" onClick={onLoginClick}>تسجيل الدخول</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
