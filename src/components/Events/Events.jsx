import { Link } from "react-router-dom";

const Events = (props) => {
    return (
        <main>
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
