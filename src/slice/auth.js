import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // LOGIN
        loginUserStart: state => {
            state.isLoading = true
        },
        loginUserSucces: state => {},
        loginUserFailure: state => {},
        //  REGISTER
        registerUserStart: state => {
            state.isLoading = true
        },
        registerUserSucces: state => {},
        registerUserFailure: state => {},
    }
});

export const {loginUserStart, registerUserStart} = authSlice.actions
export default authSlice.reducer