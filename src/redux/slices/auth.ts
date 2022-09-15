import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/axios";


export type authStateType = {
    data:null | any,
    loginStatus:string,
    registrStatus:boolean
}

export const fetchLogin = createAsyncThunk('auth/fetchLogin',async(params:any)=>{
    return await axios.post('/auth/login',params).then((res)=>res)
})

export const fetchRegistr = createAsyncThunk('auth/fetchRegistr',async(params:any)=>{
    return await axios.post('/auth/registr',params).then((res)=>res.data)
})

export const fetchAutmMe = createAsyncThunk('auth/fetchAutmMe',async()=>{
   const res = await axios.get('/auth/me').then((res)=>res.data) 
   
   return res
})



const initialState:authStateType = {
   data:null,
   loginStatus:'loading',
   registrStatus:false
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.data=null;
            state.loginStatus='loading'
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchLogin.pending,(state)=>{
            state.loginStatus='loading'
            state.data=null
        });
        builder.addCase(fetchLogin.fulfilled,(state,action)=>{
            state.data=action.payload.data
            state.loginStatus='loaded'
        });
        builder.addCase(fetchLogin.rejected,(state,action)=>{
            state.loginStatus='error';
            state.data=null
        });
        builder.addCase(fetchAutmMe.fulfilled,(state,action:any)=>{
            state.data=action.payload
             state.loginStatus='loaded'
        });
        builder.addCase(fetchRegistr.pending,(state)=>{
            state.registrStatus=false
        });
        builder.addCase(fetchRegistr.fulfilled,(state)=>{
            state.registrStatus=true
        });
        builder.addCase(fetchRegistr.rejected,(state)=>{
            state.registrStatus=false
        });
    }
})



export const {logout} = authSlice.actions

export default authSlice.reducer