import { Link } from "react-router-dom";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import { AuthedUserContext } from "../../App";
import { useContext } from "react";
import FriendList from "../FriendList/FriendList";
import "./Events.css";

const Navbar = () => {
  const user = useContext(AuthedUserContext);
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/profile">PROFILE</Link>
        <Link to="/home">HOME</Link>
        <Link to="/friends">FRIENDS</Link>
        <Link to="/new-bet">NEW BET</Link>
        <Link to="/sign-out">SIGN OUT</Link>
      </div>
      <div className="nav-right">
        <span>{user?.username}</span>
        <span>TOKENS: {user?.tokens}</span>
      </div>
    </nav>
  );
};

const Events = (props) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      <div className="container">
        <div className="left-side">
          <table className="events-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Pot</th>
                <th>Bet Amount</th>
              </tr>
            </thead>
            <tbody>
              {props.events.map((event) => (
                <tr key={event._id}>
                  <td>
                    <Link to={`/events/${event._id}`}>{event.title}</Link>
                  </td>
                  <td>{event.pot}</td>
                  <td>{event.betAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="right-side">
          <LeaderBoard className="leaderboard" /> 
          <h1>Friend list</h1>
          <FriendList className="friendlist" />
        </div>
      </div>
    </>
  );
};

export default Events;
