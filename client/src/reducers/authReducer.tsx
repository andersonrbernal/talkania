import { UserAction } from "../actions/AuthAction"

export interface AuthState {
    authData: AuthData;
    loading: boolean;
    error: boolean;
}

export interface AuthData {
    user: User;
    token: string;
}
export interface User {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    coverPicture: string;
    about: string;
    livesIn: string;
    worksAt: string;
    country: string;
    relationship: string;
    followers?: string[];
    following?: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const authReducer = (state: AuthState = { authData: null!, loading: false, error: false }, action: UserAction) => {
    switch (action.type) {
        case 'AUTH_START':
            return { ...state, loading: true, error: false }
        case 'AUTH_SUCCESS':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action.data, loading: false, error: false }
        case 'AUTH_FAIL':
            return { ...state, loading: false, error: true }
        case 'UPDATING_START':
            return { ...state, loading: true, error: false }
        case 'UPDATING_SUCCESS':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action.data, loading: true, error: false }
        case 'UPDATING_FAIL':
            return { ...state, loading: false, error: true }
        case 'FOLLOW_USER':
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following!, action.data] } } }
        case 'UNFOLLOW_USER':
            // @ts-ignore
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following.filter(personId => personId !== action.data)] } } }
        case 'LOG_OUT':
            localStorage.clear()
            return { ...state, authData: null, loading: false, error: false }
        default:
            return state
    }
}

export default authReducer