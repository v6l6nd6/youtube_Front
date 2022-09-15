import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setSortName } from "../../redux/slices/posts";
import { RootState } from "../../redux/store"

export const PostsCategory = () => {
    let categories = [{ title: 'New', value: 'datePost' }, { title: 'Populate', value: 'views' }]
    let [activeCategory, setActiveCategory] = useState('datePost');
    const { sortByParam } = useSelector((store: RootState) => store.posts);

    const dispatch = useDispatch();

    const changeSortValue = (value: any) => {
        setActiveCategory(value)
        return dispatch(setSortName(value))
    }
    useEffect(() => {

    }, [sortByParam])

    const activeStyle = 'border-b-[2px] border-blue-600 text-blue-600';
    return (
        <>
            <div className="w-full h-24 flex items-center justify-start gap-x-3">
                {categories.map((item, index) => (
                    <li key={index} className={activeCategory === item.value ? `px-6 py-2 cursor-pointer ${activeStyle}` : 'px-6 py-2 cursor-pointer'} onClick={() => changeSortValue(item.value)}>{item.title}</li>
                ))}
            </div>
        </>
    )
}