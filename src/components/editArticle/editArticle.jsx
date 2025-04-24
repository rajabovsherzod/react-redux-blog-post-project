import {React, useEffect} from 'react'
import { useState } from 'react'
import { CreateEditForm } from '../../ui';
import { useDispatch } from 'react-redux';
import ArticleService from '../../service/article';
import { getArticleDetailStart, getArticleDetailSucces, getArticleDetailFailure } from '../../slice/articleSlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { postArticleFailure, postArticleStart, postArticleSucces } from '../../slice/articleSlice';

const EditArticle = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useDispatch()
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      const getArticleDetail = async () => {
        dispatch(getArticleDetailStart())
        try {
          const response = await ArticleService.getArticleDetail(slug)
          setTitle(response.article.title)
          setDescription(response.article.description)
          setBody(response.article.body)
          dispatch(getArticleDetailSucces(response.article))
          console.log(response)
        } catch (error) {
          dispatch(getArticleDetailFailure(error))
          console.log(error)
        }
      }
      getArticleDetail()
    }, [])

    const formSubmit = async (e) => {
      e.preventDefault()
      const article = {title, description, body}
      dispatch(postArticleStart())
      try {
        const response = await ArticleService.editArticle(slug, article)
        dispatch(postArticleSucces(response.article))
        navigate('/')
      } catch (error) {
        dispatch(postArticleFailure())
      }
    }
  const buttonName = "Update Article"
    return (
        <>
            <div className="create-article-container">
            <div className="create-article-header">
                <h1>Edit Article</h1>
            </div>
            <CreateEditForm title={title} setTitle={setTitle} description={description} setDescription={setDescription} body={body} setBody={setBody} buttonName={buttonName} formSubmit={formSubmit}/>
        </div>
        </>
    )
}

export default EditArticle