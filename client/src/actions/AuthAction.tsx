import * as AuthApi from '../api/AuthRequest'
import { Dispatch } from "react";
import { User } from '../reducers/authReducer';

export interface UserAction {
    type: string,
    data?: User
}

export const login = (formdata: User) => async (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: 'AUTH_START' })

    try {
        const { data } = await AuthApi.login(formdata)
        dispatch({ type: 'AUTH_SUCCESS', data })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'AUTH_FAIL' })
    }
}

export const signup = (user: User) => async (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: 'AUTH_START' })

    try {
        const { data } = await AuthApi.signup(user)
        dispatch({ type: 'AUTH_SUCCESS', data })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'AUTH_FAIL' })
    }
}

export const logout = () => async (dispatch: Dispatch<unknown>) => {
    dispatch({type: 'LOG_OUT'})
}   