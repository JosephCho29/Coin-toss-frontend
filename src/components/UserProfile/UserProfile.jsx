import { Link, useParams } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as profileService from '../../services/profileService';



const UserProfile = (props) => {
    const user = useContext(AuthedUserContext)
    const [users, setUsers] = useState(null)
    const { userId } = useParams
    useEffect(() => {
        const fetchProfile = async () => {
            const profileData = await profileService.profile(userId);
            setUsers(profileData);
        };
        fetchProfile();
    }, [userId]);
    return (
        <main>
            <div>
                <h1>
                    {users.username}
                </h1>
            </div>
        </main>
    )


}


export default UserProfile;