import { Link, useParams } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as profileService from '../../services/profileService';
import * as userService from '../../services/userService'


import { Link, useParams } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import { useState, useEffect, useContext } from "react";
import * as profileService from "../../services/profileService";

const UserProfile = (props) => {
    const [currentUser, setCurrentUser] = useState(null)
    const { userId } = useParams ()
    useEffect(() => {
        const fetchProfile = async () => {
            const profileData = await profileService.profile(userId);
            const userData = await userService.show(userId); 
            const combinedData = { ...profileData, ...userData };
            setCurrentUser(combinedData);
           
        };
        fetchProfile();
    }, [userId]);



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

            {currentUser === currentUser && (
            <>
             <Link to={`/profile/${userId}/edit`}>Edit</Link>

              <button onClick={() => props.handleDeleteUser(userId)}>Delete</button>
            </>
          )}

        </main>

      
    )
}


export default UserProfile;
