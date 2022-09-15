import { useEffect } from "react";

import style from "./MainSlide.module.css";
import { TagsAndCommComponent } from "../TagsAndCommComp/TagsAndCommComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../../redux/slices/posts";
import { AppDispatch, RootState } from "../../redux/store";
import { PostComponent } from "../Post/Post";
import { fetchAllComment } from "../../redux/slices/comments";
import { OnePostType } from "../../types/types";


export const MainComponent = () => {
    const dispatch: AppDispatch = useDispatch();
    const { posts, tags, sortByParam } = useSelector((state: RootState) => state.posts);
    const isPostsLoading = posts.status === 'loading';
    const isTagsLoading = tags.status === 'loading';
    useEffect(() => {
        dispatch(fetchPosts(sortByParam))
        dispatch(fetchTags())
        dispatch(fetchAllComment())
    }, [sortByParam, dispatch])


    return (
        <>
            <div className={style.mainComponentStyle}>
                <div className="w-full h-full flex flex-col gap-5">
                    {isPostsLoading
                        ? (<div className="text-2xl">Loading...</div>)
                        : (<> {posts.items.map((item: OnePostType, index: any) =>
                            <PostComponent
                                id={item.user._id}
                                idPost={item._id}
                                key={item.user._id + index}
                                title={item.title}
                                imageUrl={item.imageUrl}
                                user={{
                                    avatarUrl: (item.user.avatarUrl),
                                    fullName: item.user.fullName,
                                }}
                                createdAt={String(new Date(item.createdAt)).slice(0, 21)}
                                viewsCount={item.viewsCount}
                                commentsCount={0}
                                tags={item.tags}
                            />
                        )}
                        </>)
                    }
                </div>
                <div className={style.tagsAndCommCompStyle}><TagsAndCommComponent   /></div>
            </div>
        </>
    )
}