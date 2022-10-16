import { createSlice } from '@reduxjs/toolkit'

//this function wil make isAuth is true until we sign out
const userAuthFromLocalStorage = () => {
    const isAuth = localStorage.getItem('isAuth');

    if (isAuth && JSON.parse(isAuth) === true) {
        return true;
    } 

    return false;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: userAuthFromLocalStorage()
    },
    reducers: { 
        authenticateUser: (state)=>{
            state.isAuth = true;
        },
        unauthenticateUser: (state)=>{
            state.isAuth = false;
        }
    }
})


export const {authenticateUser, unauthenticateUser} = authSlice.actions

export default authSlice.reducer