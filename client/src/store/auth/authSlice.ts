import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IauthContext } from '../../types'

const initialState :IauthContext = {
    user:{}, 
    loading: false,
    error: "",
    isAuth:false,
    disabled: false,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        
    },
})