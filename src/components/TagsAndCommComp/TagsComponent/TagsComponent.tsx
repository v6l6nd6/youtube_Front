import React from "react";
import { FaHashtag } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { fetchAllByOneTag } from "../../../redux/slices/posts";
import { AppDispatch, RootState } from "../../../redux/store";

export const TagsComponent = () => {

const dispatch:AppDispatch = useDispatch();

const { posts, tags } = useSelector((state: RootState) => state.posts);
const isPostsLoading = posts.status === 'loading';
const selectTag = (value:any)=>{
    return dispatch(fetchAllByOneTag(value))
}

    return (


        <div className="w-full p-3 bg-white mx-auto rounded-sm">
            <div className="font-bold text-xl pb-4 md:pb-2">Tags</div>
            {isPostsLoading ? <div className="flex gap-3 items-center justify-start hover:bg-[#ededede2] rounded-md mb-3 p-1 cursor-pointer md:gap-2">
                <div><FaHashtag /></div>
                <div>Loading.......</div>
            </div>
                : tags.items.map((item: any,index:any) => <Link to={'/tags'} key={index} onClick={()=>selectTag(item)} className="flex gap-3 items-center justify-start hover:bg-[#ededede2] rounded-md mb-3 p-1 cursor-pointer md:gap-1 md:mb-1">
                    <div><FaHashtag /></div>
                    <div>{item}</div>
                </Link>)
            }
        </div>

    )
}