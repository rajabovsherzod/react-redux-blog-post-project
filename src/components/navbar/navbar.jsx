import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bloggedinLogo from '../../constants/main-logo/bloggedinnew.png'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../../helpers/persistance-storage'
import { logoutUser } from '../../slice/auth'
import './navbar.css' // CSS faylini yaratamiz

const Navbar = () => {
  const {isLoggedIn, user} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false) // Hamburger menu holatini boshqarish uchun

  const logoutHandler = () => {
    dispatch(logoutUser())
    navigate('/login')
    removeItem("token")
    setMenuOpen(false) // Logout bo'lganda menuni yopish
  }

  // Menu holatini o'zgartirish
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="navbar-container">
      <div className="navbar-content container">
        <div className="navbar-logo">
          <Link to={'/'}>
            <img className='no-select-image' width={'180px'} src={bloggedinLogo} alt="Bloggedin Logo" />
          </Link>
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
        
        {/* Responsive menu */}
        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <ul className="navbar-nav">
            <li><a href="#" className="nav-link active">Blog</a></li>
            <li><a href="#" className="nav-link">Project</a></li>
            <li><a href="#" className="nav-link">About</a></li>
          </ul>
          
          <div className="navbar-auth">
            {isLoggedIn ? 
              <div className="user-menu">
                <p className="username">{user.username}</p>
                <button 
                  type="button" 
                  className="btn-logout"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
              :
              <div className="auth-buttons">
                <Link to={'/login'}>
                  <button type="button" className="btn-login">Login</button>
                </Link>
                <Link to={'/register'}>
                  <button type="button" className="btn-signup">Sign-up</button>
                </Link>
              </div>
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar