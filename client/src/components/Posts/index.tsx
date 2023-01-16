import './Posts.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/ReduxStore';
import { useEffect } from 'react';
import { getTimelinePosts } from '../../actions/PostAction';
import Post from '../Post';
import { useParams } from 'react-router-dom';

const Posts = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.authReducer.authData)
    let { posts, loading } = useSelector((state: RootState) => state.postReducer)
    const params = useParams()

    useEffect(() => {
        // @ts-ignore 
        dispatch(getTimelinePosts(user._id))
    }, [])

    if (!posts) return <div className="posts">No posts</div>
    if (params.id) posts = posts.filter(post => post.userId === params.id)

    return (
        <div className='Posts'>
            {loading ? 'Loading' : posts?.map((post, id) => <Post {...post} key={id} />)}
        </div>
    );
}

export default Posts;