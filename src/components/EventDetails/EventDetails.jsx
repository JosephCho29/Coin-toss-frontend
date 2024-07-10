import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthedUserContext } from "../../App";
import * as eventService from "../../services/eventService";

const EventDetails = (props) => {
    const user = useContext(AuthedUserContext);
    const [event, setEvent] = useState(null);
    const { eventId } = useParams();
    useEffect(() => {
        const fetchEvent = async () => {
            const eventData = await eventService.show(eventId);
            setEvent(eventData);
        };
        fetchEvent();
    }, [eventId]);

    return (
        <main>
            <h2>{event?.title}</h2>
            <p>{event?.description}</p>
            <p>{event?.pot}</p>
            <p>{event?.betAmount}</p>
            <h2>Bettors</h2>
            <p>{new Date(event?.closeOut).toLocaleString()}</p>
            {event?.betters.map((better) => (
                <div key={better._id}>{better?.better.username}</div>
            ))}
            {event?.owner === user._id && (
    <>
      <Link to={`/events/${eventId}/edit`}>Edit</Link>

      
    </>
  )}
        </main>
    );
};

export default EventDetails;
