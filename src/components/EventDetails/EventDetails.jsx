import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as eventService from "../../services/eventService";
import { AuthedUserContext } from "../../App";

const EventDetails = ({ handleBet, handleCheck }) => {
  const user = useContext(AuthedUserContext);
  const [event, setEvent] = useState(null);
  const [winningCondition, setWinningCondition] = useState("");
  const [amount, setAmount] = useState(0);
  const [inList, setInList] = useState(false);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await eventService.show(eventId);
      setEvent(eventData);
      setAmount(eventData.betAmount);
    };
    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    checkBettorList();
  }, [event]);

  const checkBettorList = () => {
    event?.betters.map((better) => {
      better.better._id === user._id ? setInList(true) : setInList(false);
    });
  };
  const handleCheckWinners = (e) => {
    // e.preventDefault();
    handleCheck(eventId)
  };

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
        <p>Pot: {event?.pot}</p>
        <p>Bet Amount: {event?.betAmount}</p>
        {Date.now() > new Date(event?.closeOut) && event?.pot !== 0 && (
          <button onClick={handleCheckWinners}>
            Check Winners
          </button>
        )}
        {Date.now() < new Date(event?.closeOut) && !inList && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Winning Condition</label>
              <select
              name="winningCondition"
                value={winningCondition}
                onChange={(e) => 
                  setWinningCondition(e.target.value)
                }
                className="narrow-input"
                required
              >
                <option value={event?.teamA}>{event?.teamA}</option>
                <option value={event?.teamB}>{event?.teamB}</option>
              </select>
            </div>
            <button type="submit">Bet</button>
          </form>
        )}
        <h2>Bettors</h2>
        <p>{new Date(event?.closeOut).toLocaleString()}</p>
        {event?.betters.map((better) => (
          <div key={better._id}>{better?.better.username}</div>
        ))}
        {event?.owner === user._id &&
          Date.now() < new Date(event?.closeOut) && (
            <Link to={`/events/${eventId}/edit`}>Edit</Link>
          )}
      </main>
    </>
  );
};
export default EventDetails;
