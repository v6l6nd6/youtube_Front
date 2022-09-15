import { Link, useLocation, useNavigate } from "react-router-dom"
import avatar from "../../image/avatar.jpg"
import { AiOutlineEye } from "react-icons/ai"
import { BsFillPencilFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { BsChatLeft } from "react-icons/bs"
import style from "../MainComponent/MainSlide.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchRemovePost } from "../../redux/slices/posts";


export const PostComponent = ({
    id,
    title,
    imageUrl,
    user,
    createdAt,
    viewsCount,
    tags,
    idPost,
    children
}: any) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const data: any = useSelector((state: RootState) => state.auth.data);
    const dataComments: any = useSelector((state: RootState) => state.comment.data);
    let lengthDataComments = dataComments.filter((dataComment: any) => dataComment.postId === id).length

    const location = useLocation()
    if (location.pathname === '/') {
        lengthDataComments = 0
    }

    const removePost = () => {
        return dispatch(fetchRemovePost(idPost))
    }



    return (
        <>
            <div className={`${style.postBlock}`}>
                {imageUrl && <div className={`${style.imageBlock}`}><img className="w-full h-full rounded-t-[5px] object-fill" src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="" /></div>}
                <div className={`${style.contentBlock}`}>
                    <div className='px-14 py-1 flex flex-col justify-center w-full h-full items-start gap-y-3'>
                        <div className='flex gap-x-2'>
                            <div className='w-10 h-10  ml-[-45px]'><img className='w-full h-full rounded-full ' src={user.avatarUrl ? `${process.env.REACT_APP_API_URL}${user.avatarUrl}` : avatar} alt="" /></div>
                            <div className='flex flex-col'>
                                <div className='font-md text-black font-bold'>{user.fullName}</div>
                                <div className='text-sm text-gray-400'>{createdAt}</div>
                            </div>
                        </div>
                        <Link to={`/fullpost/${idPost}`} className='text-4xl font-extrabold text-black hover:text-gray-800'>{title}</Link>
                        <div className='flex gap-3 text-gray-400'>
                            {tags.map((tag: any, index: any) =>
                                <div key={index} className='hover:text-gray-700 cursor-pointer'>#{tag}</div>
                            )}
                        </div>
                        <div>
                            {children &&
                                <p></p>} {children}

                        </div>
                        <div className='flex text-gray-400 gap-3'>
                            <div className='flex gap-x-1 items-center hover:text-gray-700 cursor-pointer'><AiOutlineEye />{viewsCount}</div>
                            <div className='flex gap-x-1 items-center hover:text-gray-700 cursor-pointer'><BsChatLeft />{lengthDataComments > 0 ? lengthDataComments : ''}</div>
                        </div>
                    </div>
                    {data?._id === id ? (<div className={`${style.removeBlock}`}>
                        <div><BsFillPencilFill onClick={() => navigate(`/fullpost/${idPost}/edit`)} className="hover:text-[#1717176f] cursor-pointer" /></div>
                        <div><ImCross onClick={() => removePost()} className={`hover:text-[#1717176f] cursor-pointer`} /></div>
                    </div>) : ""}
                </div>
            </div>
        </>
    )
}