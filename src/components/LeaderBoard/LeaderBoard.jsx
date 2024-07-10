import { useState, useEffect } from 'react'
import { AuthedUserContext } from "../../App";

import * as userService from "../../services/userService";


const LeaderBoard = () => {
    // const [leaderBoardData, setLeaderBoardData] = useState([])
    
    
    const [leaderBoardData, setLeaderBoardData] = useState([])
    useEffect(() => {
        const fetchBoard = async () => {
            const boardData = await userService.index();
          setLeaderBoardData(boardData);
        };
        fetchBoard();
    },[] );

// console.log(leaderBoardData)

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
            .sort((a, b) => b.tokens - a.tokens).slice(0,5)
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