import axios from 'axios'
import { User } from '../reducers/authReducer';

const API = axios.create({ baseURL: 'http://localhost:3000' });

export const login = async (user: User) => API.post('/auth/login', user);

export const signup = async (user: User) => API.post('/auth/register', user);