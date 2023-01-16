import PostSection from '../../containers/PostSection';
import ProfileBar from '../../containers/ProfileBar';
import TrendSection from '../../containers/TrendSection';
import './Home.css'

const Home = () => {
    return (
        <div className="Home">
            <ProfileBar />
            <PostSection />
            <TrendSection />
        </div>
    );
}
 
export default Home;