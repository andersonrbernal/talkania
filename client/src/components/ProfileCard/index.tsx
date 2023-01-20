import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/ReduxStore";
import { Post } from "../PostShare";
import "./ProfileCard.css";

const ProfileCard = () => {
    let ProfilePage: boolean = false;
    const { user } = useSelector((state: RootState) => state.authReducer.authData)
    const posts = useSelector((state: RootState) => state.postReducer.posts)
    const serverPublicFolder = import.meta.env.VITE_PUBLIC_FOLDER

    const currentUrl: string = location.href
    if (currentUrl.includes('/profile')) {
        ProfilePage = true
    }

    function capitalize(string: string) {
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img src={
                    user.coverPicture
                        ? serverPublicFolder + `${user.coverPicture}`
                        : serverPublicFolder + 'defaultCover.jpg'
                } alt="cover picture" style={{ maxHeight: ProfilePage ? '20rem' : '9rem', objectFit: 'cover' }} />
                <img src={
                    user.profilePicture
                        ? serverPublicFolder + `${user.profilePicture}`
                        : serverPublicFolder + 'defaultProfile.png'
                } alt="profile picture" style={{ objectFit: 'cover' }} />
            </div>

            <div className="ProfileName">
                <span>{capitalize(user.firstName)} {capitalize(user.lastName)}</span>
                <span>{user.worksAt ? user.worksAt : 'Write about yourself'}</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>{user.following?.length}</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{user.followers?.length}</span>
                        <span>Followers</span>
                    </div>

                    {ProfilePage && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>{posts?.filter((post: Post) => post.userId === user._id).length}</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            {ProfilePage ? '' :
                <Link to={`/profile/${user._id}`} className="myProfileButton">My Profile</Link >}
        </div >
    );
};

export default ProfileCard;