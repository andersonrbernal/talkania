import * as PostsApi from '../api/PostRequest'
import { Dispatch } from "redux"

export const getTimelinePosts = (userId: string) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "RETREIVING_START", loading: false, error: false });
    try {
        const { data: posts } = await PostsApi.getTimelinePosts(userId);
        dispatch({ type: "RETREIVING_SUCCESS", data: posts});
    } catch (error) {
        console.log(error);
        dispatch({ type: "RETREIVING_FAIL", loading: false, error: true });
    }
};