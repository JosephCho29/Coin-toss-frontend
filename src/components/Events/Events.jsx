import { Link } from "react-router-dom";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import { AuthedUserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import * as profileService from "../../services/profileService";


const Events = (props) => {
const user = useContext(AuthedUserContext);
const [loggedInUser, setLoggedInUser] = useState({});


    useEffect(() => {
        const fetchUser = async () => {
            const profileData = await profileService.profile(user._id);
            setLoggedInUser(profileData);
        };
        if (user) fetchUser();

    }, [user]);

    return (
        <main>
            <LeaderBoard />
            <h1>TOKENS {loggedInUser.user?.tokens}</h1>
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
