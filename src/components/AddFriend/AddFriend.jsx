import { useContext, useEffect, useState } from "react";
import { AuthedUserContext } from "../../App";
import * as userService from "../../services/userService";
const AddFriend = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await userService.index();
            console.log(usersData);
            setUsers(usersData);
            console.log(users)
        };
        fetchUsers();
    },[] );
    console.log(users);
    return (
       <main>
        {users?.map((user) => {
            return <div key={user._id}>
                <p>{user?.username}</p>
                <button>Add Friend</button>

            </div>
        })}
       </main>
    );
};




export default AddFriend;