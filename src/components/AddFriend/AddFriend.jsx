import "./AddFriend.css";
import { useContext, useEffect, useState } from "react";
import { AuthedUserContext } from "../../App";
import * as userService from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";

const AddFriend = ({ handleAddFriend }) => {
  const loggedInUser = useContext(AuthedUserContext);
  const [allUsers, setAllUsers] = useState([]);
  const profilePictures = {
    // "668826ac9352bdaaf9acf46d": "https://help.apple.com/assets/65382CE37BB3E2BCF80ADABA/65382CE57BB3E2BCF80ADAC0/en_US/dbb0631358aad57b8b57484c2a476c7e.png",
    // "668829b9d8b888fdf32a20db": "https://www.slazzer.com/blog/wp-content/uploads/2022/11/Professional-Profile-Picture-2.jpg",
    // "668829c3d8b888fdf32a20de": "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsersData = await userService.index();
      const filteredUsers = allUsersData.filter(
        (user) => user._id !== loggedInUser._id && !loggedInUser.friends.includes(user._id)
      );
      setAllUsers(filteredUsers);
    };
    fetchUsers();
  }, [loggedInUser]);

  return (
    <main className="friend-list-page">
      <div className="recommend-list-window">
        <h2>Recommend First List</h2>
        <div className="recommend-list-grid">
          {allUsers.map((user) => (
            <div key={user._id} className={`friend-item friend-${user._id}`}>
              <Link to={`/profile/${user._id}`} className="friend-link">
                <div
                  className="profile-picture"
                  style={{
                    backgroundImage: `url(${profilePictures[user._id] || 'default-image-url'})`
                  }}
                ></div>
                <p>{user?.username}</p>
              </Link>
              <button
                onClick={() => handleAddFriend(user._id)}
                className="add-friend-button"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AddFriend;

