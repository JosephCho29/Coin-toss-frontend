import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as eventService from "../../services/eventService";

const EventDetails = (props) => {
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
        </main>
    );
};

export default EventDetails;
