import axios from "axios";
import { User } from "../reducers/authReducer";

const API = axios.create({ baseURL: 'http://localhost:3000' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        // @ts-ignore
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const getUser = (userId: string) => API.get(`/user/${userId}`)

export const updateUser = (id: string, formData: FormData) => API.put(`/user/${id}`, formData)

export const getAllUsers = () => API.get('/user')

export const followUser = (id: string, user: User) => API.put(`/user/${id}/follow`, user)

export const unfollowUser = (id: string, user: User) => API.put(`/user/${id}/unfollow`, user)