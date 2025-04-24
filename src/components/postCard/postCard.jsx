import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './postCard.css';
import postCardImage1 from '../../constants/postCardImage/postCardImage1.jpg'
import postCardImage2 from '../../constants/postCardImage/postCardImage2.jpg'
import postCardImage3 from '../../constants/postCardImage/postCardImage3.jpg'
import postCardImage4 from '../../constants/postCardImage/postCardImage4.jpg'
import postCardImage5 from '../../constants/postCardImage/postCardImage5.jpg'
import postCardImage7 from '../../constants/postCardImage/postCardImage7.jpg'
import postCardImage8 from '../../constants/postCardImage/postCardImage8.jpg'
import postCardImage9 from '../../constants/postCardImage/postCardImage9.jpg'
import postCardImage10 from '../../constants/postCardImage/postCardImage10.jpg'
import postCardImage11 from '../../constants/postCardImage/postCardImage11.jpg'
import postCardImage12 from '../../constants/postCardImage/postCardImage12.jpg'

const images = [
    postCardImage1,
    postCardImage2,
    postCardImage3,
    postCardImage4,
    postCardImage5,
    postCardImage7,
    postCardImage8,
    postCardImage9,
    postCardImage10,
    postCardImage11,
    postCardImage12
  ];

  const tags = [
    "Design",
    "UI",
    "UX",
    "Interface",
    "Graphic Design",
    "Typography",
    "Figma",
    "Illustration",
    "Brand",
    "Design System",
    "Development",
  ]

  const getStableImage = (slug) => {
    // Stringdan raqamli hash yasaymiz
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
      hash = slug.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % images.length;
    return images[index];
  };
  const getStableTag = (slug) => {
    const hash = Array.from(slug).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % tags.length;
    return tags[index];
  };
  
  
  
  

const tagColors = [
    { bg: "#F3F4FF", text: "#5E5ADB" },
    { bg: "#EBF5FF", text: "#2D76E5" },
    { bg: "#FFF1F3", text: "#C11574" },
    { bg: "#E3F9E3", text: "#0F9D58" },
    { bg: "#F2F4F7", text: "#344054" },
    { bg: "#FFF4EB", text: "#E87A14" }
  ];

const PostCard = ({ post, size = 'medium', hasArrow = false, deleteArticle }) => {
      const {isLoggedIn, user} = useSelector(state => state.auth);
      const navigate = useNavigate();
      const shuffleColors = () => {
        const colors = [...tagColors];
        for (let i = colors.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [colors[i], colors[j]] = [colors[j], colors[i]];
        }
        return colors;
      };
      const randomColors = shuffleColors();
    return (
        <div className={`post-card post-card-${size}`}>
        <div className="post-image">
            <img src={getStableImage(post?.id)} alt={post?.title} />
        </div>
        <div className="post-content">
            <div className="post-meta">
            <span className="post-author text-capitalize">{post.author.username}</span>
            <span className="post-date">• {post.createdAt ? new Date(post.createdAt).toISOString().slice(0, 10) : '2025-03-25'} {post.createdAt ? new Date(post.createdAt).toISOString().slice(11, 16) : '09:45'}</span>
            </div>
            <h3 className="post-title">{post.title.length > 35? `${post.title.slice(0, 35)}...`: post.title}{hasArrow && <span className="arrow-icon">→</span>}</h3>
            {size !== 'small' && <p className="post-description">{post.description}</p>}
            <div className="post-tags">
                {post.tagList?.length > 0 ? (
                    post.tagList.map((tag, index) => (
                    <span 
                        key={tag} 
                        className="post-tag"
                        style={{ 
                        backgroundColor: randomColors[index % randomColors.length].bg,
                        color: randomColors[index % randomColors.length].text 
                        }}
                    >
                        {tag}
                    </span>
                    ))
                        ) : (
                            <span 
                            className="post-tag"
                            style={{ 
                                backgroundColor: randomColors[0].bg,
                                color: randomColors[0].text 
                            }}
                            >
                            {getStableTag(post.id)}  {/* Random tag */}
                            </span>
                        )}
      </div>
      <div className="post-actions">
          <button 
            onClick={() => navigate(`/article/${post.slug}`, { state: { imageUrl: getStableImage(post.id) } })}
            className="action-btn view-btn" 
            aria-label="View post"
            title="View post"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 2a6 6 0 0 0-6 6c0 1.421.663 2.682 1.695 3.56.353.276.697.532 1.032.766A11.799 11.799 0 0 0 8 14s1.304-.582 3.273-1.674A8.8 8.8 0 0 0 12.305 11.56C13.337 10.682 14 9.421 14 8c0-3.315-2.686-6-6-6zm0 10c-2.29 0-4.144-1.712-4.144-4 0-2.288 1.855-4 4.144-4 2.289 0 4.144 1.712 4.144 4 0 2.288-1.855 4-4.144 4zm0-7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
            </svg>
            <span className="btn-text">View</span>
          </button>
          {isLoggedIn && user.username === post.author.username && (
            <>
              <button 
              className="action-btn edit-btn" 
              aria-label="Edit post"
              title="Edit post"
              onClick={() => navigate(`/edit-article/${post.slug}`)}
                >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
              </svg>
              <span className="btn-text">Edit</span>
            </button>
            
            <button 
              className="action-btn delete-btn" 
              aria-label="Delete post"
              title="Delete post"
              onClick={() => deleteArticle(post.slug)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
              <span className="btn-text">Delete</span>
            </button>
            </>
          )
        }
          
        </div>
        </div>
        </div>
    );
};

export default PostCard;