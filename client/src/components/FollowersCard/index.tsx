import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllUsers } from '../../api/UserRequest'
import { User as UserType } from '../../reducers/authReducer'
import { RootState } from '../../store/ReduxStore'
import User from '../User'
import './FollowersCard.css'

const FollowersCard = () => {
    const [people, setPeople] = useState<UserType[]>([])
    const { user } = useSelector((state: RootState) => state.authReducer.authData)

    useEffect(() => {
        const fetchPeople = async () => {
            const { data } = await getAllUsers()
            setPeople(data)
        }
        fetchPeople()
    }, [])

    return (
        <div className="FollowersCard">
            <h3 style={{ fontSize: '1.444rem' }}>Who is following you</h3>
            {people.map((person, id) => {
                if (person._id !== user._id) return <User {...person} key={id} />
            })}
        </div>
    )
}

export default FollowersCard