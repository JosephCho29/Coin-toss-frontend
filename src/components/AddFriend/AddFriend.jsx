import "./AddFriend.css";
import { useContext, useEffect, useState } from "react";
import { AuthedUserContext } from "../../App";
import * as userService from "../../services/userService";
import { Link } from "react-router-dom";

const AddFriend = () => {
  const user = useContext(AuthedUserContext);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await userService.index();
      setAllUsers(usersData);
    };
    fetchUsers();
  }, []);

  const handleAddFriend = async (friendId) => {
    await userService.addFriend(friendId, user._id);
  };

  return (
    <main>
      {allUsers?.map((user) => {
        return (
          <div key={user._id}>
            <Link to={`/profile/${user._id}`}>
              <p>{user?.username}</p>
            </Link>
            <button onClick={() => handleAddFriend(user._id)}>
              Add Friend
            </button>
          </div>
        );
      })}
    </main>
  );
};

export default AddFriend;
