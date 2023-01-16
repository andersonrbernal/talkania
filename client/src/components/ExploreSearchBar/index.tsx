import logo from '../../img/logo.png'
// @ts-ignore
import { UilSearch } from '@iconscout/react-unicons'
import './ExploreSearchBar.css'
import { Link } from 'react-router-dom';

const ExploreSearchBar = () => {
    return (
        <div className="ExploreSearchBar">
            <Link to='/home'>
                <img src={logo} alt='logo' />
            </Link>
            <form className="Search">
                <input type="text" placeholder='#Explore' />
                <button className="search-icon">
                    <UilSearch />
                </button>
            </form>
        </div>
    );
}

export default ExploreSearchBar;