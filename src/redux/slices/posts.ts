import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../axios/axios"
import { OnePostType } from "../../types/types"








export type postUserType = {
_id:string,
fullname:string,
email:string,
createdAt:string,
updatedAt:string
}

export type postInitStateType = {
    posts:{
        items:Array<any>,
        status:string
    },
    post:OnePostType,
    tags:{
        items:Array<any>,
        status:string
    },
    selectedTags:Array<string>,
    sortByParam:string
}


export const fetchPosts = createAsyncThunk('posts/fetchPosts',async(param:string)=>{
     const result = (await axios.get(`/posts?sortBy=${param}`).then((res:any)=>res.data))
     return result
 })
 
 export const fetchPost = createAsyncThunk('posts/fetchPost',async(id:string|undefined)=>{ 
   const data =  ((await axios.get(`/posts/${id}`).then((res)=>res.data)))
     return  data      
  })
  export const fetchImageLoad = createAsyncThunk('posts/fetchUpload',async(params:any)=>{ 
    const data =  (await axios.post('/upload', params).then((res:any)=>res.data.url))
    
      return  data      
   })
 
 export const fetchTags = createAsyncThunk('posts/fetchTags',async()=>{
     return (await axios.get('/tags')).data
  })

  export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost',async(id:string)=>{
    return await axios.delete(`posts/${id}`)
  })
 
export const fetchEditPost = createAsyncThunk('posts/fetchEditPost',async(params:any)=>{
    const {fields,id} = params
    return await axios.patch(`/posts/${id}`,fields)
})  

export const fetchAllByOneTag = createAsyncThunk('posts/fetchAllByOneTag',async(param:any)=>{
    
    const result = await axios.get(`/tags/${param}`).then((data:any)=>data.data);
    return result
})  

const initialState:postInitStateType = {
    posts:{
        items:[],
        status:'loading'
    },
    post:{
        _id:'0',
        createdAt:'0',
        tags:[''],
        text:'',
        title:'DefaultTitle',
        updatedAt:'',
        imageUrl:'',
        user:{
            _id:'',
            fullName:'',
            email:'',
            passwordHash:'',
            avatarUrl:'',
            createdAt:'',
            updatedAt:''
        },
        viewsCount:0,
    },
    tags:{
        items:[],
        status:'loading'
    },
    selectedTags:[],
    sortByParam:'datePost'
}



const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        setSortName:(state,action)=>{
            state.sortByParam =action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPosts.pending,(state)=>{
            state.posts.status='loading'
        });
        builder.addCase(fetchPosts.fulfilled,(state,action)=>{
            state.posts.items=action.payload
            state.posts.status='loaded'
        });
        builder.addCase(fetchPosts.rejected,(state)=>{
            state.posts.items=[];
            state.posts.status='error';
        });
        builder.addCase(fetchPost.fulfilled,(state,action)=>{
            state.post={...action.payload}
        });
        builder.addCase(fetchTags.pending,(state)=>{
            state.tags.status='loading'
        })
        builder.addCase(fetchTags.fulfilled,(state,action)=>{
            state.tags.items=action.payload
            state.tags.status='loaded'
        })
        builder.addCase(fetchTags.rejected,(state)=>{
            state.tags.items=[];
            state.tags.status='error';
        })
        builder.addCase(fetchRemovePost.pending,(state,action)=>{
            state.posts.items= state.posts.items.filter((obj)=>obj._id!==action.meta.arg)
        })

        builder.addCase(fetchAllByOneTag.fulfilled,(state,action)=>{
            state.selectedTags=action.payload
        })
    }
})

export const {setSortName} = postsSlice.actions

export default postsSlice.reducer