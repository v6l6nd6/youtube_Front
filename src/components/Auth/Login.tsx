import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../redux/slices/auth";
import { AppDispatch, RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export type sumbitLoginFormType = {
    email: string | null,
    password: string | null
}

export const LoginComponent = () => {

    const dispatch: AppDispatch = useDispatch();
    const { loginStatus,data } = useSelector((state: RootState) => state.auth)

    const { register, handleSubmit, formState: { errors } } = useForm<sumbitLoginFormType>();

    const submitForm: SubmitHandler<sumbitLoginFormType> = async (data) => {

        const dataRes = {
            email: data.email,
            password: data.password
        }

        const result: any = await dispatch(fetchLogin(dataRes));
        
            if ('token' in result.payload.data) {
                window.localStorage.setItem('token', result.payload.data.token)
               
            } else {
                alert('Profile Token is not found')
            }
        
    }

    useEffect(()=>{
        
   
    },[loginStatus,dispatch,data])
    if (loginStatus === 'loaded') {
       return <Navigate to="/" />
   }

    return (
        <>
            <form onSubmit={handleSubmit(submitForm)} className="w-[310px] h-full py-6 bg-white mx-auto">
                <div className="text-black font-bold text-xl flex justify-center mb-3">Вход в аккаунт</div>
                <div className="w-[80%] flex flex-col gap-4 mx-auto">
                    <input {...register("email", { required: 'Write email...' })} placeholder={errors.email ? errors.email?.message : `email`} className="w-full h-12 border-solid border-[0.5px] border-gray-400 rounded-sm" />
                    <div className="text-[12px] text-red-600">{errors.email?.message}</div>
                    <input {...register("password", { required: 'Write password...' })} placeholder={errors.password ? errors.password?.message : `password`} className="w-full h-12 border-solid border-[0.5px] border-gray-400 rounded-sm" />
                    <div className="text-[12px] text-red-600">{loginStatus === 'error' && 'Problem with authorization'}</div>
                    <input type="submit" className="w-[80%] h-12 bg-blue-600 text-white flex justify-center items-center text-lg rounded-sm mx-auto" value={'Enter'} />
                </div>
            </form>
        </>
    )
}