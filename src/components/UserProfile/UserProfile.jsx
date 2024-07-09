import { Link, useParams } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as profileService from '../../services/profileService';



const UserProfile = (props) => {
    const [currentUser, setCurrentUser] = useState(null)
    const { userId } = useParams ()
    useEffect(() => {
        const fetchProfile = async () => {
            const profileData = await profileService.profile(userId);
            setCurrentUser(profileData);
            
        };
        fetchProfile();
    }, [userId]);
    console.log(userId);
    console.log(currentUser);
    return (
        <main>
            <div>
                <h1>
                {currentUser?.user.username}'s profile
                </h1>
                TOKENS: 
                <p>{currentUser?.user.tokens}</p>
                Bets:
                {currentUser?.user.bets.map((bet) => (
                    <div key={bet._id}>{bet?.title}</div>
                ))}
                Events Created:
                {currentUser?.user.events.map((event) => (
                    <div key={event._id}>{event?.title}</div>
                ))}
                Friends:
                {currentUser?.user.friends.map((friend) => (
                    <div key={friend._id}>{friend?.username}</div>
                ))}
            </div>
        </main>
    )
}


export default UserProfile;