import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isloading: false,
    articles: [],
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
        getArticlesFailure: (state, action) => {
            state.error = action.payload
        }
    },
})

export const {getArticlesStart, getArticlesSucces, getArticlesFailure} = articleSlice.actions
export default articleSlice.reducer