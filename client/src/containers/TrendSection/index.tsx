import './TrendSection.css'
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
// @ts-ignore
import { UilSetting } from "@iconscout/react-unicons";
// import TrendCard from '../../components/TrendCard';
import { useState } from 'react';
import ShareModal from '../../components/ShareModal';
import { Link } from 'react-router-dom';


const TrendSection = () => {
    const [modalOpened, setModalOpened] = useState(false)
    return (
        <section className="TrendSection">
            <div className="navIcons">
                <Link to='/home' >
                    <img src={Home} alt="home" />
                </Link>
                <UilSetting />
                <img src={Noti} alt="notification" />
                <img src={Comment} alt="comment" />
            </div>
            {/* <TrendCard {...TrendData} /> */}
            <button className="button r-button" onClick={() => setModalOpened(true)}>
                Share
            </button>
            <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
        </section>
    )
}

export default TrendSection;