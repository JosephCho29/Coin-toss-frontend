import { useContext, useEffect, useState } from "react";
import { AuthedUserContext } from "../../App";
// import * as userService from "../../services/userService";



const LeaderBoard = () => {

    const [users, setUsers] = useState([])
    const [leaderBoardData, setLeaderBoardData] = useState([])

    useEffect(() => {

        const fetchUsers = async () => {
            const usersData = await userService.index();
            setUsers(usersData);
        };

        fetchUsers();
    },[] );
    console.log(users);



    return (
        <div>
          <h1>Leaderboard</h1>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderBoardData
                .sort((a, b) => b.score - a.score) 
                .map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.username}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    }



export default LeaderBoard;






{/* 
{users?.map((user) => {
            return <div key={user._id}>
                <p>{user?.username}</p>
            </div> */}