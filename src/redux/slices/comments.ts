import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/axios";




export const fetchAllComment = createAsyncThunk('comment/fetchAllComment',async()=>{
    return await axios.get('/comments').then((res)=>res.data)
})

export const fetchAddComment = createAsyncThunk('comment/fetchAddComment',async(param:any)=>{

    const result = await axios.post(`/comments/${param.id}`,param.date).then((res)=>res.data.comments);
    return result
})

export const fetchRemoveComment = createAsyncThunk('comment/fetchRemoveComment',async(id:any)=>{

    const result = await axios.delete(`/comments/${id}`).then((res)=>res);
    return result
})



const initialState:any = {
   data:[],
   post:{},
   status:'loading',
}

const commentsSlice = createSlice({
    name:'comment',
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{


        builder.addCase(fetchAllComment.fulfilled,(state,action)=>{
            state.data=action.payload

        });
        

        builder.addCase(fetchAddComment.pending,(state,action)=>{
            state.status='loading'

        });
        builder.addCase(fetchAddComment.fulfilled,(state,action)=>{
            state.status='loaded'

        });

        builder.addCase(fetchRemoveComment.pending,(state,action)=>{
            state.status='loading'

        });
        builder.addCase(fetchRemoveComment.fulfilled,(state,action)=>{
            state.status='loaded'

        });
      


    }
})


export const selectIsLogin = (state:any)=> Boolean(state.auth.data);

export default commentsSlice.reducer