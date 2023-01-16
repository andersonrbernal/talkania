import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { User as UserType } from "../../reducers/authReducer";
import { RootState } from "../../store/ReduxStore";

const User = (person: UserType) => {
    const { user } = useSelector((state: RootState) => state.authReducer.authData)
    const [following, setFollowing] = useState(person.followers?.includes(user._id))
    const serverPublicFolder = import.meta.env.VITE_PUBLIC_FOLDER
    const dispatch = useDispatch()
    const username = person.email.split("@", 1)[0]
    console.log(username)

    function capitalize(string: string) {
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }

    function handleFollow() {
        following
            // @ts-ignore
            ? dispatch(unfollowUser(person._id, user))
            // @ts-ignore
            : dispatch(followUser(person._id, user))
        setFollowing(prev => !prev)
    }

    return (
        <div className="follower">
            <div>
                <img src={
                    person.profilePicture
                        ? serverPublicFolder + person.profilePicture
                        : serverPublicFolder + '/defaultProfile.png'
                } alt="profile picture" className='followerImage' style={{ objectFit: 'cover' }} />
                <div className="name">
                    <span>{capitalize(person.firstName)}</span>
                    <span>{username}</span>
                </div>
            </div>
            <button className={following ? 'button fc-button unfollowButton' : 'button fc-button'} onClick={handleFollow}>
                {following ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    );
}

export default User;