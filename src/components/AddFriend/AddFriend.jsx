import { useContext, useEffect, useState } from "react";
import { AuthedUserContext } from "../../App";
import * as userService from "../../services/userService";
import { Link } from "react-router-dom";

const AddFriend = () => {
  const user = useContext(AuthedUserContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await userService.index();
      setUsers(usersData);
    };
    fetchUsers();
  }, []);
  return (
    <main>
      {users?.map((user) => {
        return (
          <Link key={user._id} to={`/profile/${user._id}`}>
            <p>{user?.username}</p>
            <button>Add Friend</button>
          </Link>
        );
      })}
    </main>
  );
};

export default AddFriend;
