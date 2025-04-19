import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Main, Login, Register, Navbar, PublicRoute } from './components'
import AuthService from './service/auth'
import { useDispatch } from 'react-redux'
import { signUserSucces } from './slice/auth'
import { getItem } from './helpers/persistance-storage'
const App = () => {
  const dispatch = useDispatch()
  const getUser = async () => {
    try {
      const response = await AuthService.getUser()
      dispatch(signUserSucces(response.user))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const token = getItem('token')
    if(token){
      getUser()
    }
  }, [])

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path='/login' element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
        }/>
        <Route path='/register' element={
            <PublicRoute>
                <Register/>
            </PublicRoute>
        }/>
      </Routes>
    </div>
  )
}

export default App