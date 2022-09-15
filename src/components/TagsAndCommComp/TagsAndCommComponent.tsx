import React from "react";
import { CommentsComponent } from "./CommentsComponent.tsx/CommentComponent";
import { TagsComponent } from "./TagsComponent/TagsComponent";




export const TagsAndCommComponent = ()=>{



    return (
        
        <div className="w-full h-full flex flex-col gap-3 sm:flex-row">
        <TagsComponent/> 
            <CommentsComponent/>
        </div>
    )
}