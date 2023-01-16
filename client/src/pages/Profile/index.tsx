import ProfileCard from '../../components/ProfileCard';
import ProfileLeft from '../../components/ProfileLeft';
import PostSection from '../../containers/PostSection';
import TrendSection from '../../containers/TrendSection';
import './Profile.css'

const Profile = () => {
    return (
        <section className="Profile">
            <ProfileLeft />
            <div className="Profile-center">
                <ProfileCard />
                <PostSection />
            </div>
            <TrendSection />
        </section>
    );
}

export default Profile;