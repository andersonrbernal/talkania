// @ts-ignore
import { UilPen } from '@iconscout/react-unicons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store/ReduxStore'
import ProfileModal from '../ProfileModal'
import * as UserApi from '../../api/UserRequest'
import './InfoCard.css'
import { User } from '../../reducers/authReducer'
import { logout } from '../../actions/AuthAction'

const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false)
    const dispatch = useDispatch()
    const params = useParams()
    const profileUserId = params.id as string
    const [profileUser, setProfileUser] = useState({} as User)
    const { user } = useSelector((state: RootState) => state.authReducer.authData)

    useEffect(() => {
        const fetchProfileUser = async () => {
            if (profileUserId === user._id) {
                setProfileUser(user)
            } else {
                const profileUser = await UserApi.getUser(profileUserId)
                // @ts-ignore
                setProfileUser(profileUser)
            }
        }
        fetchProfileUser()
    }, [user])

    function handleLogout() {
        // @ts-ignore
        dispatch(logout())
    }

    return (
        <div className="InfoCard">
            <div className="infoHead">
                <h4 id='bold'>Profile Info</h4>
                {user._id === profileUserId ? (
                    <div className='penIcon'>
                        <UilPen width='2rem' height='1.2rem' onClick={() => setModalOpened(true)} />
                        <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} userData={user} />
                    </div>
                ) : ('')}
            </div>
            <div className="info">
                <span id='bold'>Status </span>
                <span>{profileUser.relationship}</span>
            </div>
            <div className="info">
                <span id='bold'>Lives in </span>
                <span>{profileUser.country}</span>
            </div>
            <div className="info">
                <span id="bold">Works at </span>
                <span>{profileUser.worksAt}</span>
            </div>
            <button className="button logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default InfoCard;