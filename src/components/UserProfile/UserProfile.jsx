import { Link, useParams } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import { useState, useEffect, useContext } from "react";
import * as profileService from "../../services/profileService";
import './UserProfile.css'; 

const UserProfile = (props) => {
  const user = useContext(AuthedUserContext);
  const [currentUser, setCurrentUser] = useState(null);
  const { userId } = useParams();
  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await profileService.profile(userId);
      setCurrentUser(profileData);
    };
    fetchProfile();
  }, [userId]);

  return (
    <div className="user-profile-container">
      <div className="profile-section">
        <img src={currentUser?.user.profilePhoto} alt="Profile" className="profile-photo" />
        <h1>{currentUser?.user.username}'s profile</h1>
        <div className="tokens">
          TOKENS:
          <p>{currentUser?.user.tokens}</p>
        </div>
        <div className="bets">
          Events you bet on:
          {currentUser?.user.bets.map((bet) => (
            <div key={bet._id}>{bet?.title}</div>
          ))}
        </div>
        {user._id === currentUser?.user._id && (
          <div className="delete-section">
            <p>delete user</p>
            <button onClick={() => props.handleDeleteUser(userId)}>Delete</button>
          </div>
        )}
      </div>

      <div className="events-section">
        <h2>Events Created:</h2>
        <div className="events">
          {currentUser?.user.events.map((event) => (
            <div key={event._id}>{event?.title}</div>
          ))}
        </div>
      </div>

      <div className="friends-section">
        <h2>Friends:</h2>
        <div className="friends">
          {currentUser?.user.friends.map((friend) => (
            <div key={friend._id}>{friend?.username}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

