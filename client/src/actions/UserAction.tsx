import { Dispatch } from "redux";
import { UploadAction } from "./UploadAction.";
import * as UserApi from '../api/UserRequest'
import { User } from "../reducers/authReducer";

interface FollowAndUnfollowAction {
    type: string
    data: string
}

export const updateUser = (id: string, formData: FormData) => async (dispatch: Dispatch<UploadAction>) => {
    dispatch({ type: 'UPDATING_START' })
    try {
        const { data } = await UserApi.updateUser(id, formData)
        dispatch({ type: 'UPDATING_SUCCESS', data: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'UPDATING_FAIL' })
    }
}

export const followUser = (id: string, user: User) => async (dispatch: Dispatch<FollowAndUnfollowAction>) => {
    dispatch({ type: 'FOLLOW_USER', data: user._id })
    UserApi.followUser(id, user)
}

export const unfollowUser = (id: string, user: User) => async (dispatch: Dispatch<FollowAndUnfollowAction>) => {
    dispatch({ type: 'UNFOLLOW_USER', data: user._id })
    UserApi.unfollowUser(id, user)
}