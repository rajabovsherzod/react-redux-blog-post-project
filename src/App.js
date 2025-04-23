import React, { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Main, Login, Register, Navbar, PublicRoute, ArticleDetail } from './components'
import AuthService from './service/auth'
import { useDispatch } from 'react-redux'
import { signUserSucces } from './slice/auth'
import {getArticlesStart, getArticlesSucces} from './slice/articleSlice'
import { getItem } from './helpers/persistance-storage'
import ArticleService from './service/article'
import Footer from './components/footer/footer'
import { Loader } from './ui'
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
    <div className='blog-container'>
      <Navbar/>
      <Suspense fallback={<Loader/>}>
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
          <Route path='/article/:slug' element={<ArticleDetail/>}/>
        </Routes>
      </Suspense>
      
      <Footer/>
    </div>
  )
}

export default App