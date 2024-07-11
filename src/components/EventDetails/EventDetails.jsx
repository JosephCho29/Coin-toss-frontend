import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as eventService from "../../services/eventService";
import { AuthedUserContext } from "../../App";

const EventDetails = ({ handleBet }) => {
  const user = useContext(AuthedUserContext);
  const [event, setEvent] = useState(null);
  const [winningCondition, setWinningCondition] = useState("");
  const [amount, setAmount] = useState(0);
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await eventService.show(eventId);
      setEvent(eventData);
      setAmount(eventData.betAmount);
    };
    fetchEvent();
  }, [eventId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBet = {
      amount: amount,
      winningCondition,
    };
    handleBet(eventId, newBet);

    setWinningCondition("");
    setAmount(0);
  };

  return (
    <>
    <main>
      <h2>{event?.title}</h2>
      <p>Description: {event?.description}</p>
      <p>Pot: {event?.pot}</p>
      <p>Bet Amount: {event?.betAmount}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Win Condition:</label>
          <input
            type="text"
            name="winningCondition"
            value={winningCondition}
            onChange={(e) => setWinningCondition(e.target.value)}
            required
          />
        </div>
        <button type="submit">Bet</button>
      </form>
      <h2>Bettors</h2>
      <p>{new Date(event?.closeOut).toLocaleString()}</p>
      {event?.betters.map((better) => (
        <div key={better._id}>{better?.better.username}</div>
      ))}
      {event?.owner === user._id && (

      <Link to={`/events/${eventId}/edit`}>Edit</Link>
      )}
    </main>
    </>
  );
};
export default EventDetails;
