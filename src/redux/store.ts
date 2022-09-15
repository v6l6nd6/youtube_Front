import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "./slices/posts";
import AuthReducer from "./slices/auth"
import CommentReducer from "./slices/comments";

const store = configureStore({
    reducer:{
        posts:PostReducer,
        auth:AuthReducer,
        comment:CommentReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store;