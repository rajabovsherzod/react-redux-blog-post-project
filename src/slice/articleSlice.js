import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isloading: false,
    articles: [],
    articleDetail: null,
    error: null,
}

export const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        getArticlesStart: state => {
            state.isloading = true
        },
        getArticlesSucces: (state, action) => {
            state.isloading = false
            state.articles = action.payload
        },
        getArticlesFailure: (state, { payload }) => {
            state.error = payload
            state.isloading = false
        },
        getArticleDetailStart: state => {
            state.isloading = true
        },
        getArticleDetailSucces: (state, {payload}) => {
            state.isloading = false
            state.articleDetail = payload
        },
        getArticleDetailFailure: (state, {payload}) => {
            state.error = payload
            state.isloading = false
        },
    },
})

export const {getArticlesStart, getArticlesSucces, getArticlesFailure, getArticleDetailStart, getArticleDetailSucces, getArticleDetailFailure} = articleSlice.actions
export default articleSlice.reducer