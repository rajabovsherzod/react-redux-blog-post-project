import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Main, Login, Register, Navbar, PublicRoute } from './components'
import AuthService from './service/auth'
import { useDispatch } from 'react-redux'
import { signUserSucces } from './slice/auth'
import {getArticlesStart, getArticlesSucces} from './slice/articleSlice'
import { getItem } from './helpers/persistance-storage'
import ArticleService from './service/article'
const App = () => {
  const dispatch = useDispatch()
  const getUser = async () => {
    try {
      const response = await AuthService.getUser()
      dispatch(signUserSucces(response.user))
    } catch (error) {
      console.log(error)
    }
  }

  const getArticles = async () => {
    dispatch(getArticlesStart())
    try {
      const response = await ArticleService.getArticle()
      dispatch(getArticlesSucces(response.articles))
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
    getArticles()
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