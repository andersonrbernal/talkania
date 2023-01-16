import { Dispatch } from 'redux'
import * as UploadApi from '../api/UploadRequest'
import { Post } from '../components/PostShare'

export interface UploadAction {
    type: string;
    data?: FormData
}

export const uploadImage = (data: FormData) => async (dispatch: Dispatch<UploadAction>) => {
    dispatch({ type: 'UPLOADING_IMAGE' })
    try {
        await UploadApi.uploadImage(data)
        dispatch({ type: 'IMAGE_UPLOADED' })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'UPLOAD_FAIL' })
    }
}

export interface PostAction {
    type: string,
    data?: Post
}

export const uploadPost = (post: Post) => async (dispatch: Dispatch<PostAction>) => {
    dispatch({ type: 'UPLOAD_START' })
    try {
        const { data: posts } = await UploadApi.uploadPost(post)
        dispatch({ type: 'UPLOAD_SUCCESS', data: { ...posts.message } })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'UPLOAD_FAIL' })
    }
}