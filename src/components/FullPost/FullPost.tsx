
import { FullPostComment } from "./FullPostComment/FullPostComment";
import { PostComponent } from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchPost } from "../../redux/slices/posts";
import ReactMarkdown from 'react-markdown'

export const FullPost = () => {
    const {post} = useSelector((state: RootState) => state.posts);

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();



    useEffect(() => {
        dispatch(fetchPost(id))
    }, [])

    return (
        <>
            <div className="flex flex-col gap-3">
                <PostComponent
                    id={id}
                    title={post.title}
                    imageUrl={post.imageUrl}
                    user={{
                        avatarUrl: (post.user.avatarUrl),
                        fullName: post.user.fullName,
                    }}
                    createdAt={String(new Date(post.createdAt)).slice(0,21)}
                    viewsCount={post.viewsCount}
                    commentsCount={3}
                    idPost={post._id}
                    tags={post.tags}>
                    <ReactMarkdown children={post.text} />
                </PostComponent>
                <FullPostComment post={post} id={post._id}/>
            </div>
        </>
    )
}