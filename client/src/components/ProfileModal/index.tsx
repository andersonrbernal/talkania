import { Modal } from '@mantine/core';
import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/UploadAction.';
import { updateUser } from '../../actions/UserAction';
import { User } from '../../reducers/authReducer';
import { RootState } from '../../store/ReduxStore';
import './ProfileModal.css'

interface Props {
    modalOpened: boolean;
    setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    userData: User
}

interface UserData {
    firstName?: string;
    lastName?: string;
    worksAt?: string;
    country?: string;
    relationship?: string;
    profilePicture?: string;
    coverPicture?: string;
}

function ProfileModal({ modalOpened, setModalOpened, userData }: Props) {
    const { password, ...other } = userData;
    const [formData, setFormData] = useState(other);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            let img: File = e.target.files[0]

            e.target.name === 'profilePicture' ? setProfileImage(img) : setCoverImage(img)
        };
    }
    // form submission
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        let userData: UserData = formData

        if (profileImage) {
            const data = new FormData()
            const fileName = Date.now() + profileImage.name
            data.append("name", fileName)
            data.append("file", profileImage)
            userData.profilePicture = fileName
            try {
                // @ts-ignore
                dispatch(uploadImage(data))
            } catch (err) {
                console.log(err)
            }
        }
        if (coverImage) {
            const data = new FormData()
            const fileName = Date.now() + coverImage.name
            data.append("name", fileName)
            data.append("file", coverImage)
            userData.coverPicture = fileName
            try {
                // @ts-ignore
                dispatch(uploadImage(data))
            } catch (err) {
                console.log(err)
            }
        }
        console.log(userData)
        // @ts-ignore
        dispatch(updateUser(id, userData))
        setModalOpened(false)
    }

    return (
        <Modal size="lg" opened={modalOpened} onClose={() => setModalOpened(false)}>
            {/* @ts-ignore */}
            <form className='infoForm' onSubmit={handleSubmit}>
                <h3>Your info</h3>
                <div className='inputGroup'>
                    <input type="text" name='firstName' onChange={handleChange} placeholder='First Name' />
                    <input type="text" name='lastName' onChange={handleChange} placeholder='Last Name' />
                </div>
                <div className='inputGroup'>
                    <input type="text" name='worksAt' onChange={handleChange} placeholder='Works At' />
                    <input type="text" name='country' onChange={handleChange} placeholder='Country' />
                </div>
                <div className="inputGroup">
                    <input type="text" name='relationship' onChange={handleChange} placeholder='Relationship Status' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="profile-image">Profile Image</label>
                    <input type="file" name='profilePicture' onChange={onImageChange} accept="image/*" />
                </div>
                <div className="inputGroup">
                    <label htmlFor="cover-image">Cover Image</label>
                    <input type="file" name='coverPicture' onChange={onImageChange} accept="image/*" />
                </div>
                <div className="buttonGroup">
                    <button className='button infoButton' type="submit">Update</button>
                </div>
            </form>
        </Modal>
    )
}

export default ProfileModal