import { Link } from "react-router-dom";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import { AuthedUserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import FriendList from "../FriendList/FriendList";

const Events = (props) => {
  const user = useContext(AuthedUserContext);
  return (
    <main>
      <h1>{user?.username}</h1>
      <h1>TOKENS: {user?.tokens}</h1>
      <FriendList />
      <LeaderBoard />
      {props.events.map((event) => (
        <Link key={event._id} to={`/events/${event._id}`}>
          <div>
            <p>Title: {event.title}</p>
            <p>Pot: {event.pot}</p>
            <p>Bet Amout: {event.betAmount}</p>
          </div>
        </Link>
      ))}
    </main>
  );
};

export default Events;
