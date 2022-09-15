import { BsFillPencilFill } from "react-icons/bs";
import { GiCrossedBones } from "react-icons/gi";

export const EditBlock =({props}:any)=>{
    return (
        <>
        <div className={`flex w-[70px] h-[40px] justify-around items-center gap-x-2 rounded-md bg-white ${props} top-2 right-2`}>
        <div><BsFillPencilFill className="hover:text-[#1717176f] cursor-pointer" color={""} /></div>
        <div><GiCrossedBones className={`hover:text-[#1717176f] cursor-pointer`} /></div>
    </div>
    </>
    )
}