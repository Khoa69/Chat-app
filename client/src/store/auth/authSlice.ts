import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authService } from '../../services/auth.service';
import { IauthContext, IauthLogin, IauthRegister } from '../../types'
import { handleLoginFailure, handleLoginPending, handleLoginSuccess} from './actions';

export const loginAPI = createAsyncThunk("user/login", async (payload: IauthLogin) => {
    const result = await authService.login(payload.email, payload.password);
    return result;
});

export const registerAPI = createAsyncThunk("user/register", async (payload: IauthRegister) => {
    const result = await authService.register(payload.name,payload.email,payload.re_password,payload.password);
    return result;
});

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
        logout: (state) => {
            state.user = {};
            state.isAuth = false;
            state.error= "";
        },
    },
    extraReducers:builder => {
        builder.addCase(loginAPI.pending, handleLoginPending),
        builder.addCase(loginAPI.rejected, handleLoginFailure),
        builder.addCase(loginAPI.fulfilled, handleLoginSuccess),
        builder.addCase(registerAPI.pending, handleLoginPending),
        builder.addCase(registerAPI.rejected, handleLoginFailure),
        builder.addCase(registerAPI.fulfilled, handleLoginSuccess)
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;