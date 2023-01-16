import axios from 'axios'
import { Post } from '../components/PostShare';

const API = axios.create({ baseURL: 'http://localhost:3000' });

export const uploadImage = async (data: FormData) => API.post('/upload/', data)

export const uploadPost = async (data: Post) => API.post('/post/create', data)