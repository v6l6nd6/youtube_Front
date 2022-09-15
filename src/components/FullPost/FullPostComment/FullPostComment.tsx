import avatar from "../../../image/avatar.jpg";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAddComment, fetchAllComment, fetchRemoveComment } from "../../../redux/slices/comments";
import { GiCrossedBones } from "react-icons/gi";
import { commentType, fullPostCommentType } from "../../../types/types";


export type FormValues = {
    comment: string
};



export const FullPostComment:React.FC<fullPostCommentType> = ({ post, id }) => {
    const { register, handleSubmit, reset } = useForm<FormValues>();
    const dispatch: AppDispatch = useDispatch();
    const { data, status } = useSelector((state: RootState) => state.comment);
    const idPost: string = useSelector((state: RootState) => state.auth?.data?._id);
    const { loginStatus } = useSelector((state: RootState) => state.auth);



    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const req = {
            date: {
                text: data.comment,
                postId: id
            },
            id
        }
        dispatch(fetchAddComment(req))
        reset()
    };

    const removeComment = (idComment: string) => {
        return dispatch(fetchRemoveComment(idComment))
    }

    useEffect(() => {
        dispatch(fetchAllComment())
    }, [dispatch, status])

    return (
        <>
            <div className="w-full p-3 bg-white mx-auto rounded-sm">
                <div className="font-bold text-xl pb-6">Comments</div>
                <div className="flex flex-col gap-3">
                    {data.map((comment: commentType) => (

                        comment?.postId === id ? <div key={comment._id} className="flex gap-3 items-center justify-start relative border-b-[1px] border-[#dadadaa7]">
                            <div className="w-[45px] h-[45px] relative"><img className="absolute t-0 l-0 w-full h-full rounded-[50%]" src={`${process.env.REACT_APP_API_URL}${comment.user.avatarUrl}`} alt="" /></div>
                            <div className="flex flex-col  ">
                                <div className="text-md">{comment.user.fullName}</div>
                                <div className="text-md">{String(new Date(comment.updatedAt)).slice(0, 21)}</div>
                                <div className="text-sm text-[#a8a8a8f4]">{comment.text}</div>
                            </div>
                            {comment.user?._id === idPost ? (<div className="w-[15px] h-[15px] absolute right-0 top-0"><GiCrossedBones className={`w-full h-full cursor-pointer`} onClick={() => removeComment(comment._id)} /></div>) : ''}
                        </div>
                            : ""

                    ))}
                    {loginStatus === 'loaded' && (<form className="w-full flex gap-1" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-[45px] h-[45px] relative"><img className="absolute t-0 l-0 w-full h-full rounded-[50%]" src={post.user.avatarUrl ? `${process.env.REACT_APP_API_URL}${post.user.avatarUrl}` : avatar} alt="" /></div>
                        <div className="flex flex-col w-full gap-2">
                            <input className="w-full h-12 border-solid border-[0.7px] border-gray-300" {...register("comment")} placeholder='write comment...' />
                            <input className="w-44 h-12 bg-blue-600 text-white" type="submit" value={'Send'} /></div>
                    </form>)}
                </div>
            </div>
        </>
    )
}