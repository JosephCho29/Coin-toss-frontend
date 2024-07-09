import { useState, useEffect } from 'react'
import { AuthedUserContext } from "../../App";

import * as userService from "../../services/userService";


const LeaderBoard = () => {
    const [leaderBoardData, setLeaderBoardData] = useState([])
    
    
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

console.log(leaderBoardData)

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
          {users
            .sort((a, b) => b.score - a.score) 
            .map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.username}</td>
                <td>{entry.tokens}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderBoard;