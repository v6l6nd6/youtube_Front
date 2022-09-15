import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegistr } from "../../redux/slices/auth";
import { fetchImageLoad } from "../../redux/slices/posts";
import { AppDispatch, RootState } from "../../redux/store";


export const RegistrComponent = () => {

    type submitRegistrFormType = {
        avatarUrl: any,
        fullname: string,
        email: string,
        password: string
    }

    const dispatch: AppDispatch = useDispatch();
    const { registrStatus } = useSelector((state: RootState) => state.auth);
    const [imageUrl, setImageUrl] = useState('');

    const handleChangeFile = async (event: any) => {
        try {
            const formData = new FormData();
            const file: any = event.target.files[0]
            formData.append('image', file)
            const url = await dispatch(fetchImageLoad(formData))
            setImageUrl(url.payload)
        }
        catch (err: any) {
            console.warn(err)
            alert('Error by file sending')
        }

    };

    const { register, handleSubmit, formState: { errors } } = useForm<submitRegistrFormType>();

    const submitForm: SubmitHandler<submitRegistrFormType> = async (data) => {
        const dataRes = {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
            avatarUrl: imageUrl

        }
        return await dispatch(fetchRegistr(dataRes))
    }


    return (
        <>
            {!registrStatus
                ? (<form onSubmit={handleSubmit(submitForm)} className="w-[310px] h-full py-6 bg-white mx-auto">
                    <div className="text-black font-bold text-xl flex justify-center mb-3">Create an account</div>
                    <div className="w-[80%] flex flex-col gap-4 mx-auto">
                        <div className="w-[80px] h-[80px] mx-auto overflow-hidden relative rounded-full bg-slate-300">
                            {!imageUrl
                                ? (<><input type="file" {...register("avatarUrl")} className="w-[130%] h-[160%] bg-gray-400  mx-auto absolute top-[-35%] right-0" onChange={handleChangeFile} />
                                </>)
                                : (<img className={'w-full h-full'} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="imageAvatar"></img>)
                            }
                        </div>
                        {!imageUrl && <div className="text-black font-bold text-sm flex justify-center">Click on the circle to add Avatar</div>}
                        <input {...register("fullname")} placeholder='full name...' className="w-full h-12 border-solid border-[0.5px] border-gray-400 rounded-sm" />
                        <input {...register("email")} placeholder='email...' className="w-full h-12 border-solid border-[0.5px] border-gray-400 rounded-sm" />
                        <input {...register("password")} placeholder='password...' className="w-full h-12 border-solid border-[0.5px] border-gray-400 rounded-sm" />
                        <input type="submit" className="w-[80%] h-12 bg-blue-600 text-white flex justify-center items-center text-lg rounded-sm mx-auto" value={'Enter'} />
                    </div>
                </form>)
                : (<div>Registrtion is succesfull. Please log in...</div>)
            }

        </>
    )
}