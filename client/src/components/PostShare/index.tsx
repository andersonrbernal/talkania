// @ts-nocheck
import ProfileImage from '../../img/ProfileImg.jpg'
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import './PostShare.css'
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/ReduxStore';
import { uploadPost, uploadImage } from '../../actions/UploadAction.';

export interface Post {
    userId: string;
    description: string;
    likes?: string[];
    image: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


const PostShare = () => {
    const loading = useSelector((state: RootState) => state.postReducer.uploading)
    const [image, setImage] = useState<File>(null)
    const dispatch = useDispatch()
    const serverPublicFolder = import.meta.env.VITE_PUBLIC_FOLDER
    const imageRef = useRef()
    const description = useRef()
    const { user } = useSelector((state: RootState) => state.authReducer.authData)

    function reset() {
        setImage(null);
        description.current.value = "";
    };

    function onImageChange(event: Event) {
        const files: File[] = (event.target.files as HTMLInputElement)
        const thereIsAnImage: boolean = files && files[0]

        if (thereIsAnImage) {
            let img = files[0]
            setImage(img)
        }
    }

    function handleSubmit(e: Event) {
        e.preventDefault()

        const newPost: Post = {
            userId: user._id,
            description: description.current.value,
            image: image
        }

        if (image) {
            const data = new FormData()
            const filename = Date.now() + image.name
            data.append('name', filename)
            data.append('file', image)
            newPost.image = filename

            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
        }
        dispatch(uploadPost(newPost))
        reset()
    }

    return (
        <div className="PostShare">
            <img src={
                user.profilePicture
                    ? serverPublicFolder + `${user.profilePicture}`
                    : serverPublicFolder + 'defaultProfile.png'
            } alt="profile image" style={{ maxHeight: '20rem', objectFit: 'cover' }} />
            <form>
                <input type="text" ref={description} required placeholder="What's happening?" />
                <div className='postOptions'>
                    <div
                        className="option"
                        style={{ color: 'var(--photo)' }}
                        onClick={() => imageRef.current.click()}
                    >
                        <UilScenery /> Photo
                    </div>
                    <div className="option" style={{ color: 'var(--video)' }}>
                        <UilPlayCircle /> Video
                    </div>
                    <div className="option" style={{ color: 'var(--location)' }}>
                        <UilLocationPoint /> Location
                    </div>
                    <div className="option" style={{ color: 'var(--schedule)' }}>
                        <UilSchedule /> Schedule
                    </div>
                    <button className='button ps-button' disabled={loading} onClick={handleSubmit}>
                        {loading ? 'Uploading' : 'Share'}
                    </button>

                </div>
                <div style={{ display: 'none' }}>
                    <input type="file" name='myImage' ref={imageRef} accept="image/*" onChange={onImageChange} />
                </div>
                {image && (
                    <div className="previewImage">
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="photo" />
                    </div>
                )}
            </form>
        </div>
    );
}

export default PostShare;