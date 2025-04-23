import {React, useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import ArticleService from '../../service/article'
import { useDispatch } from 'react-redux'
import {getArticleDetailStart, getArticleDetailSucces, getArticleDetailFailure} from '../../slice/articleSlice'
import { useSelector } from 'react-redux'
import postCardImage10 from '../../constants/postCardImage/postCardImage10.jpg'
import {PostCard} from '../'

import './article-detail.css'
const ArticleDetail = () => {
  const {slug} = useParams()
  const {state} = useLocation()
  const imageUrl = state?.imageUrl
  const dispatch = useDispatch()
  const getArticleDetail = async () => {
    dispatch(getArticleDetailStart())
    try {
      const response = await ArticleService.getArticleDetail(slug)
      dispatch(getArticleDetailSucces(response.article))
      console.log(response)
    } catch (error) {
      dispatch(getArticleDetailFailure(error))
      console.log(error)
    }
  }
  useEffect(() => {
    getArticleDetail()
  }, [slug])

  const {articleDetail, articles} = useSelector(state => state.article) 
  console.log("article",articleDetail)
  console.log("articles",articles)


  const suggestedPosts = [...articles || []].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
  console.log(suggestedPosts.map(post => post.title));


  return (
    <div className="article-detail-container">
      <div className="article-header">
        <div className="article-cover-image">
          <img src={imageUrl} alt="{articleDetail.title}" />
        </div>
      </div>

      <div className="article-content-wrapper">
        <article className="article-content">
          <h1 className="article-title">{articleDetail?.title}</h1>

          <div className="article-meta">
            <div className="article-author">
              <span className="text-capitalize">{articleDetail?.author?.username}</span>
            </div>
            <div className="article-dates">
              <span className="article-date">
                Published:{" "}
                {new Date(articleDetail?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {articleDetail?.updatedAt && articleDetail?.updatedAt !== articleDetail?.createdAt && (
                <span className="article-date">
                  Updated:{" "}
                  {new Date(articleDetail?.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>

          <div className="article-tags">
            {articleDetail?.tagList.map((tag) => (
              <span key={tag} className="article-tag">
                {tag}
              </span>
            ))}
          </div>

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: "articleDetail.body" }}
          ></div>
        </article>
      </div>

      <div className="suggested-posts-section">
        <div className="suggested-posts-wrapper">
          <h2 className="suggested-posts-title">Suggested Articles</h2>
          <div className="suggested-posts-grid">
            {suggestedPosts.map((post) => (
              <div key={post.id} className="suggested-post-item">
                <PostCard key={post.id} post={post} size="medium" hasArrow={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetail