import React from 'react'
import { useNavigate } from 'react-router-dom';
import './createEditForm.css'
import { useSelector } from 'react-redux';

const CreateEditForm = ({title, setTitle, description, setDescription, body, setBody, formSubmit, buttonName}) => {
const navigate = useNavigate();
const {isLoading} = useSelector(state => state.article) 
  return (
    <>
      <form onSubmit={(e) => formSubmit(e)} className="create-article-form" >
        <div className="form-group">
          <label htmlFor="articleTitle">Title</label>
          <input
            type="text"
            id="articleTitle"
            placeholder="Enter article title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="articleDescription">Short description</label>
          <textarea
            id="articleDescription"
            placeholder="Brief description for your article"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={1}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="articleBody">Article body</label>
          <textarea
            id="articleBody"
            placeholder="Write your article content here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="12"
            required
          ></textarea>
          <p className="form-tip">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
            </svg>
            You can use Markdown formatting in your article
          </p>
        </div>
        
        {/* <div className="form-group">
          <label htmlFor="articleTags">Tags</label>
          <input
            type="text"
            id="articleTags"
            placeholder="Enter tags separated by commas (e.g. programming, tutorial, react)"
            // value={tags}
            // onChange={(e) => setTags(e.target.value)}
          />
        </div>
         */}
        {/* <div className="form-group">
          <label htmlFor="articleImage">Cover image</label>
          <div className="image-upload-container">
            <div className={`image-upload-area ${"imagePreview" ? 'has-image' : ''}`}>
              {"imagePreview" ? (
                <img src={"imagePreview"} alt="Article cover preview" className="image-preview" />
              ) : (
                <div className="upload-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                  </svg>
                  <p>Click to upload image or drag and drop</p>
                </div>
              )}
              <input
                type="file"
                id="articleImage"
                accept="image/*"
                // onChange={handleImageChange}
                className="file-input"
              />
            </div>
            {"imagePreview" && (
              <button
                type="button"
                className="remove-image-btn"
                // onClick={() => {
                //   setImage(null);
                //   setImagePreview('');
                // }}
              >
                Remove image
              </button>
            )}
          </div>
        </div> */}
        
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {isLoading ? (
              <>
                {buttonName === "Update Article" ? <span>Updating...</span> : <span>Publishing...</span>}
              </>
            ) : (
              `${buttonName}`
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default CreateEditForm