import ExploreSearchBar from "../../components/ExploreSearchBar";
import FollowersCard from "../../components/FollowersCard";
import ProfileCard from "../../components/ProfileCard";
import './ProfileBar.css'

const ProfileBar = () => {
    return (
        <section className="ProfileBar">
            <ExploreSearchBar />
            <ProfileCard />
            <FollowersCard />
        </section>
    );
}

export default ProfileBar;