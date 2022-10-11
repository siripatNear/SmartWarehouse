import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'counter',
    initialState: {
        isAuth: false
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