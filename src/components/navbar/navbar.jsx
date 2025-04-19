import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bloggedinLogo from '../../constants/main-logo/bloggedinnew.png'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../../helpers/persistance-storage'
import { logoutUser } from '../../slice/auth'

const Navbar = () => {
  const {isLoggedIn , user} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  console.log(isLoggedIn)
  const navigate = useNavigate()

  const logoutHandler = () => {
      dispatch(logoutUser())
      navigate('/login')
      removeItem("token")
  }


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
        
        {isLoggedIn ? 
        <div style={{display: 'flex', width: '', justifyContent: 'end', alignItems: 'center'}}>
          <p className='m-0 me-3' style={{marginRight: '20px'}}>{user.username}</p>
          <button type="button" className="btn btn-outline-danger me-2" onClick={logoutHandler}>Logout</button>
        </div>
        :
        <>
            <Link to={'/login'}>
              <button type="button" className="btn btn-outline-dark me-2">Login</button>
          </Link>
          <Link to={'/register'}>
              <button type="button" className="btn btn-dark">Sign-up</button>
          </Link>
        </>
        }
        
      </div>
    </header>
  )
}

export default Navbar