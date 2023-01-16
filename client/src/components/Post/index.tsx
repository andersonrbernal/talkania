import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { Post as PostType } from '../PostShare'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/ReduxStore'
import { useState } from 'react'
import { likePost } from '../../api/PostRequest'
import './Post.css'

const Post: React.FC<PostType> = (post: PostType) => {
    const { user: currentUser } = useSelector((state: RootState) => state.authReducer.authData);
    const [liked, setLiked] = useState(post.likes?.includes(currentUser._id));
    const [likes, setLikes] = useState(post.likes?.length)

    async function handleLike() {
        likePost(post._id, currentUser._id)
        setLiked(prev => !prev)
        liked ? setLikes(prev => prev! - 1) : setLikes(prev => prev! + 1)
    }

    return (
        <div className="Post">
            <img src={post.image ? import.meta.env.VITE_PUBLIC_FOLDER + post.image : ''} alt="" />
            <span>{likes} likes</span>
            <div className="postReact">
                <img src={liked ? Heart : NotLike} alt="like" style={{ cursor: 'pointer' }} onClick={handleLike} />
                <img src={Comment} alt="comment" style={{ cursor: 'pointer' }} />
                <img src={Share} alt="share" style={{ cursor: 'pointer' }} />
            </div>
            <div className="detail">
                <span> {post.description}</span>
            </div>
        </div>
    );
}

export default Post;