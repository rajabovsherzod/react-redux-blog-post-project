import React from 'react'
import { useState } from 'react'
import { CreateEditForm } from '../../ui'
import ArticleService from '../../service/article';
import { useDispatch } from 'react-redux';
import { postArticleFailure, postArticleStart, postArticleSucces } from '../../slice/articleSlice';
import { useNavigate } from 'react-router-dom';

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formSubmit = async (e) => {
    e.preventDefault()
    const article = {title, description, body}
    dispatch(postArticleStart())
    try {
      const response = await ArticleService.postArticle(article)
      dispatch(postArticleSucces(response.article))
      navigate('/')
    } catch (error) {
      dispatch(postArticleFailure())
    }
  }
  return (
    <>
      <div className="create-article-container">
          <div className="create-article-header">
            <h1>Create New Article</h1>
            <p>Share your knowledge and ideas with the community</p>
          </div>
          <CreateEditForm title={title} setTitle={setTitle} description={description} setDescription={setDescription} body={body} setBody={setBody} formSubmit={formSubmit} />
      </div>
    </>
  )
}

export default CreateArticle