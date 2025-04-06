import React from 'react'
import { Link } from 'react-router-dom'
import bloggedinLogo from '../../constants/main-logo/bloggedinnew.png'

const Navbar = () => {
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom container">
      <div className="col-md-3 mb-2 mb-md-0">
        <Link to={'/'}>
            <img width={'180px'} src={bloggedinLogo} alt="" />
        </Link>
      </div>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="#" className="nav-link px-3 link-secondary">Blog</a></li>
        <li><a href="#" className="nav-link px-3">Project</a></li>
        <li><a href="#" className="nav-link px-3">About</a></li>
      </ul>

      <div className="col-md-3 text-end">
        <Link to={'/login'}>
            <button type="button" className="btn btn-outline-dark me-2">Login</button>
        </Link>
        <Link to={'/register'}>
            <button type="button" className="btn btn-dark">Sign-up</button>
        </Link>
        
      </div>
    </header>
  )
}

export default Navbar