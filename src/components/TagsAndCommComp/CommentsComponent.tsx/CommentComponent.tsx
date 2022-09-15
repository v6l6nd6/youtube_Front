import {  useSelector } from "react-redux"
import avatar from "../../../image/avatar.jpg"
import { RootState } from "../../../redux/store";
import { GiCrossedBones } from "react-icons/gi";



export const CommentsComponent = () => {

    const { data } = useSelector((state: RootState) => state.comment);
    
    const resData = data.slice(0, 3)

    return (

        <div className="w-full p-3 bg-white mx-auto rounded-sm md:p-2">
            <div className="font-bold text-xl pb-6">Comments</div>
            <div className="flex flex-col gap-y-3">
                {resData.map((comment: any, index: any) => (
                    <div key={index} className="flex gap-3 items-center justify-start relative border-b-[1px] border-[#dadadaa7]">
                        <div className="w-[45px] h-[45px] relative"><img className="absolute t-0 l-0 w-full h-full rounded-[50%]" src={comment.user.avatarUrl ? `${process.env.REACT_APP_API_URL}${comment.user.avatarUrl}` : avatar} alt="" /></div>
                        <div className="flex flex-col  ">
                            <div className="text-md">{comment.user.fullName}</div>
                            <div className="text-md">{String(new Date(comment.updatedAt)).slice(0, 10)}</div>
                            <div className="text-sm text-[#a8a8a8f4]">{comment.text.slice(0,13)}...</div>
                        </div>
                      <div className="w-[15px] h-[15px] absolute right-0 top-0"><GiCrossedBones className={`w-full h-full cursor-pointer`} /></div> 
                    </div>
                ))}
            </div>
        </div>
    )
}