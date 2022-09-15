
import { useSelector } from 'react-redux'
import logo from '../../logo.svg'
import { RootState } from '../../redux/store'


export const TagsComponent = () => {

    const selectedTags = useSelector((state: RootState) => state.posts.selectedTags)

    return (
        <>
            <div className="w-full grid grid-cols-3 gap-8">
                {selectedTags.map((item: any, index: any) => (
                    <div key={index} className="border-solid border-[0.5px] border-[#5a5a5a] flex flex-col p-3 rounded-md">
                        <div className='w-full'><img src={logo} alt="photoImage" /></div>
                        <div className='text-gray-900 text-2xl font-semibold'>{item.title}</div>
                        <div className='flex w-full gap-3'>
                            {item.tags.map((tag: any, index: any) => (
                                <div key={index} className='text-xl font-bold text-gray-700 '># {tag}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}