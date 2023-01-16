import ExploreSearchBar from '../ExploreSearchBar';
import FollowersCard from '../FollowersCard';
import InfoCard from '../InfoCard';

const ProfileLeft = () => {
    return (
        <div className="ProfileBar">
            <ExploreSearchBar />
            <InfoCard />
            <FollowersCard />
        </div>
    );
}

export default ProfileLeft;