
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchAutmMe } from "../redux/slices/auth";
import { AppDispatch, RootState } from "../redux/store";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { PostsCategory } from "./MainComponent/PostsCategory";
import style from "./Wrapper.module.css";


export const Wrapper = () => {

    const dispatch: AppDispatch = useDispatch();
    const { loginStatus, registrStatus } = useSelector((state: RootState) => state.auth)
    useEffect(() => {
        dispatch(fetchAutmMe())

    }, [dispatch, loginStatus, registrStatus])

    return (

        <div className="bg-[#ecececbf]">
            <header className={style.headerStyle}><Header /></header>
            <main className={style.wrapperStyle}>
                <div className={style.postsCategory}><PostsCategory /></div>
                <div className={style.postsComponentStyle}><Outlet /></div>
            </main>
            <footer className={style.footerStyle}><Footer /></footer>
        </div>

    )
}