
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import style from "./CreatePost.module.css";
import axios from "../../axios/axios"
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditPost, fetchImageLoad, fetchPost } from '../../redux/slices/posts';
import { AppDispatch, RootState } from '../../redux/store';

export const CreatePost = () => {
    const {id} = useParams()

    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const inputFileRef: any = useRef();
    const navigate = useNavigate();
    const dispatch:AppDispatch = useDispatch();
    const {post}= useSelector((state:RootState)=>state.posts)

    const isEditing = Boolean(id)
   
    const handleChangeFile = async (event:ChangeEvent<any>) => {
        try {
            const formData = new FormData();
            const file:any = event.target.files[0]
            formData.append('image', file)
            const url:any = await dispatch(fetchImageLoad(formData))
            setImageUrl(url.payload)
        }
        catch (err: any) {
            console.warn(err)
            alert('Error by file sending')
        }

    };
    const fields = {
        text,
        title,
        tags,
        imageUrl
    }
    const onClickRemoveImage = () => {
        setImageUrl('');
    };

    const updatePost = ()=>{
        dispatch(fetchEditPost({id,fields}))
       return navigate(`/fullpost/${id}`)
    }
   
    useEffect(()=>{
        if(id){
            try{

             dispatch(fetchPost(id))
             
                setText(post.text)
                setTitle(post.title)
                setTags(post.tags.join(' '))
                setImageUrl(post.imageUrl)

            }
            catch(err){
                alert('Error on loading dat. of post')
            }
          }
         
    },[dispatch,id,post.title,post.imageUrl,post.text])

    const onSubmit = async () => {

        const dataPost = {
            title,
            text,
            imageUrl,
            tags
        }
        const {data}: any = await axios.post('/posts', dataPost)
        console.log(data)
        return navigate(`/fullpost/${data._id}`)

    }

    const onChange = useCallback((value: string) => {
        setText(value);
    }, []);


    const options: any = useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '300px',
            autofocus: true,
            placeholder: '',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    return (
        <>
            <div className='bg-white w-full'>
                <div className="p-[30px]">
                    <button onClick={() => inputFileRef.current.click()} className="w-[170px] h-[40px] flex justify-center items-center border-[0.5px] border-blue-600 rounded-md">
                        Load preview
                    </button>
                    <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
                    {imageUrl && (
                        <button color="error" className='w-[170px] h-[40px] mt-2 flex justify-center items-center border-[1.5px] border-red-600 rounded-md' onClick={onClickRemoveImage}>
                            Deletee
                        </button>
                    )}
                    {imageUrl && (
                        <img className={'w-2/3 md:w-full h-[400px] md:h-[250px]'} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="imageURI" />
                    )}
                    <br />
                    <br />
                    <input
                        className="w-full h-10 text-2xl text-gray-500"
                        placeholder="Заголовок статьи..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input className={"w-full h-5 text-sm "} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Тэги" />
                    <SimpleMDE className={style.editor} value={text} onChange={onChange} options={options} />

                    <div className='flex gap-6 mt-3'>
                        <button onClick={() =>isEditing ? updatePost() : onSubmit()} className='w-[170px] h-[40px] flex justify-center items-center border-[1px] border-blue-600 rounded-md'>
                           {isEditing ? 'Save' : 'Publish'}
                        </button>
                        <Link to={"/"}>
                            <button className='w-[170px] h-[40px] flex justify-center items-center border-[1.5px] border-blue-600 rounded-md'>Cancel</button>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}