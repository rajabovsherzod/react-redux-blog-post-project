import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLoading: false,
    articles: [],
    articleDetail: null,
    error: null,
}

export const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        getArticlesStart: state => {
            state.isLoading = true
        },
        getArticlesSucces: (state, action) => {
            state.isLoading = false
            state.articles = action.payload
        },
        getArticlesFailure: (state, { payload }) => {
            state.error = payload
            state.isLoading = false
        },
        getArticleDetailStart: state => {
            state.isLoading = true
        },
        getArticleDetailSucces: (state, {payload}) => {
            state.isLoading = false
            state.articleDetail = payload
        },
        getArticleDetailFailure: (state, {payload}) => {
            state.error = payload
            state.isLoading = false
        },
        postArticleStart: state => {
            state.isLoading = true
        },
        postArticleSucces: (state) => {
            state.isLoading = false
        },
        postArticleFailure: state => {
            state.isLoading = false
            state.error = "Error Article Post progress"
        }
    },
})

export const {getArticlesStart, getArticlesSucces, getArticlesFailure, getArticleDetailStart, getArticleDetailSucces, getArticleDetailFailure, postArticleStart, postArticleSucces, postArticleFailure} = articleSlice.actions
export default articleSlice.reducer