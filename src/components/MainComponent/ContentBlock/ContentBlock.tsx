import avatar from '../../../image/avatar.jpg';
import { AiOutlineEye } from "react-icons/ai"
import { BsChatLeft } from "react-icons/bs"
import { Link } from 'react-router-dom';

export const ContentBlock = ({ item }: any) => {


    return (
        <>
            <div className='px-14 py-1 flex flex-col justify-center w-full h-full items-start gap-y-3'>
                <div className='flex gap-x-2'>
                    <div className='w-10 h-10  ml-[-45px]'><img className='w-full h-full rounded-full ' src={avatar} alt="" /></div>
                    <div className='flex flex-col'>
                        <div className='font-md text-black font-bold'>{item.user.fullName}</div>
                        <div className='text-sm text-gray-400'>{item.createdAt}</div>
                    </div>
                </div>
                <Link to="/fullpost" className='text-2xl font-bold'>{item.title}</Link>
                <div className='flex gap-3 text-gray-400'>
                    {item.tags.map((tag: any, index: any) =>
                        <div key={index} className='hover:text-gray-700 cursor-pointer'># {tag}</div>
                    )}

                </div>
                <div>
                    <p>
                        {item.text}
                    </p>
                </div>
                <div className='flex text-gray-400 gap-3'>
                    <div className='flex gap-x-1 items-center hover:text-gray-700 cursor-pointer'><AiOutlineEye />{item.user.viewsCount}</div>
                    <div className='flex gap-x-1 items-center hover:text-gray-700 cursor-pointer'><BsChatLeft />3</div>
                </div>
            </div>

        </>
    )
}