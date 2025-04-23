import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bloggedinLogo from '../../constants/main-logo/bloggedinnew.png';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../helpers/persistance-storage';
import { logoutUser } from '../../slice/auth';
import './navbar.css';

const Navbar = () => {
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/login');
    removeItem("token");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Ekran o'lchami o'zgarganda menu avtomatik yopiladi
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  // Menyu ochilganda scroll bo'lishini oldini olish
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="navbar-container">
      {/* Original Navbar */}
      <div className="navbar-main container">
        <div className="navbar-logo">
          <Link to={'/'}>
            <img className='no-select-image' width={'180px'} src={bloggedinLogo} alt="Bloggedin Logo" />
          </Link>
        </div>
        
        {/* Desktop menusi - navigatsiyalar markazda */}
        <div className="desktop-menu">
          <ul className="nav-links-horizontal">
            <li><a href="#" className="nav-link active">Blog</a></li>
            <li><a href="#" className="nav-link">Project</a></li>
            <li><a href="#" className="nav-link">About</a></li>
          </ul>
        </div>
        
        {/* Auth qismi */}
        <div className="desktop-auth">
          {isLoggedIn ? (
            <div className="user-menu">
              <p className="username">{user.username}</p>
              <button className="auth-button logout" onClick={logoutHandler}>Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login">
                <button className="auth-button login">Login</button>
              </Link>
              <Link to="/register">
                <button className="auth-button signup">Sign-up</button>
              </Link>
            </div>
          )}
        </div>
        
        {/* Hamburger button */}
        <button 
          className={`hamburger-menu ${menuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      {/* Hamburger Menu Dropdown */}
      <div className={`navbar-dropdown ${menuOpen ? 'open' : ''}`}>
        <div className="dropdown-content">
          {/* Tablet dropdown - bitta qatorda */}
          <div className="tablet-dropdown">
            <div className="dropdown-row">
              <div className="dropdown-nav-links no-select">
                <a href="#" className="nav-link no-select">Blog</a>
                <a href="#" className="nav-link no-select">Project</a>
                <a href="#" className="nav-link no-select">About</a>
              </div>
              
              <div className="dropdown-auth">
                {isLoggedIn ? (
                  <div className="user-menu">
                    <p className="username">{user.username}</p>
                    <button className="auth-button logout" onClick={logoutHandler}>Logout</button>
                  </div>
                ) : (
                  <div className="auth-buttons">
                    <Link to="/login">
                      <button className="auth-button login">Login</button>
                    </Link>
                    <Link to="/register">
                      <button className="auth-button signup">Sign-up</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Mobile dropdown - markazlashtirilgan */}
          <div className="mobile-dropdown">
            <div className="mobile-nav">
              <a href="#" className="nav-link active">Blog</a>
              <a href="#" className="nav-link">Project</a>
              <a href="#" className="nav-link">About</a>
            </div>
            
            <div className="mobile-auth">
              {isLoggedIn ? (
                <div className="mobile-user">
                  <p className="username">{user.username}</p>
                  <button className="auth-button logout" onClick={logoutHandler}>Logout</button>
                </div>
              ) : (
                <div className="mobile-buttons">
                  <Link to="/login">
                    <button className="auth-button login">Login</button>
                  </Link>
                  <Link to="/register">
                    <button className="auth-button signup">Sign-up</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;