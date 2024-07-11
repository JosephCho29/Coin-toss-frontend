import "./AddFriend.css";
import { useContext, useEffect, useState } from "react";
import { AuthedUserContext } from "../../App";
import * as userService from "../../services/userService";
import * as authService from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

const AddFriend = ({ handleAddFriend }) => {
  const loggedInUser = useContext(AuthedUserContext);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsersData = await userService.index();
      const filteredUsers = allUsersData.filter(
        (user) => user._id !== loggedInUser._id,
      );
      setAllUsers(filteredUsers);
    };
    fetchUsers();
  }, [loggedInUser]);

  return (
    <main>
      {allUsers?.map((user) => {
        return (
          <div key={user._id}>
            {!loggedInUser?.friends.includes(user._id) && (
              <Link to={`/profile/${user._id}`}>
                <p>{user?.username}</p>
              </Link>
            )}
            {!loggedInUser?.friends.includes(user._id) && (
              <button onClick={() => handleAddFriend(user._id)}>
                Add Friend
              </button>
            )}
          </div>
        );
      })}
    </main>
  );
};

export default AddFriend;
