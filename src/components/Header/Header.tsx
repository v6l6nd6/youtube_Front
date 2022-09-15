

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/slices/auth";
import { AppDispatch, RootState } from "../../redux/store";



export const Header = () => {

    const dispatch: AppDispatch = useDispatch();
    const { data, loginStatus } = useSelector((state: RootState) => state?.auth)
    const onClickLogout = () => {
        window.localStorage.removeItem('token')
        return dispatch(logout())
    }

    return (
        <div className="max-w-[1180px] h-full mx-auto  flex justify-between items-center p-3">
            <Link to={'/'} className="max-w-[34%] flex justify-center bg-[#3325d3e9] py-2 px-4 rounded-md text-white cursor-pointer hover:bg-[#4f5cd3f0] transition duration-300">{data?.fullName}-Blog</Link>
            <div className="flex gap-x-3 transition duration-700">

                {loginStatus === 'loading' && (<><Link to="/login" className="bg-[#3325d3e9] py-2 px-4 rounded-md text-white cursor-pointer hover:bg-[#4f5cd3f0] transition duration-300">Sign in</Link>
                    <Link to="/registr" className="py-2 px-4 rounded-md border-solid border-[0.5px] cursor-pointer hover:bg-[#eae9e9cb] transition duration-300">Sign up</Link></>
                )}

                {loginStatus === 'error' && (<><Link to="/login" className="bg-[#3325d3e9] py-2 px-4 rounded-md text-white cursor-pointer hover:bg-[#4f5cd3f0] transition duration-300">Sign in</Link>
                    <Link to="/registr" className="py-2 px-4 rounded-md border-solid border-[0.5px] cursor-pointer hover:bg-[#eae9e9cb] transition duration-300">Sign up</Link></>
                )}

                {loginStatus === 'loaded' && (<><Link to="/createpost" className="bg-[#3325d3e9] py-2 px-4 rounded-md text-white cursor-pointer hover:bg-[#4f5cd3f0] transition duration-300">Create Article</Link>
                    <Link to={'/'} onClick={onClickLogout} className="bg-red-800 py-2 px-4 rounded-md text-white cursor-pointer hover:bg-[#eb4949f0] transition duration-300">Log out</Link></>
                )}
            </div>
        </div>
    )
}