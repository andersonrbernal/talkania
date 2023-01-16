import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3000' });

export const getTimelinePosts = (id: string) => API.get(`/post/${id}/timeline`)

export const likePost = (id: string, userId: string) => API.put(`post/${id}/like`, { userId: userId })