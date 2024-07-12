import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as eventService from "../../services/eventService";
import { AuthedUserContext } from "../../App";

const EventDetails = ({ handleBet }) => {
  const user = useContext(AuthedUserContext);
  const [event, setEvent] = useState(null);
  const [winningCondition, setWinningCondition] = useState("");
  const [amount, setAmount] = useState(0);
  const [inList, setInList] = useState(false);
  const { eventId } = useParams();
  const [formData, setFormData] = useState();

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

  // winning condtion ---------- Splitting Dynamically to not be just team a or b

  const titleStr = event?.title;
  console.log(titleStr);
  const words = titleStr?.split(" ");
  console.log(words);

  const declareWinner = () => {
    if (titleStr === winningCondition) {
      // Need to set to either A or B!!!!!!! (If, or statement????? )
      console.log("Winner declared!");
    } else {
      console.log("No winner yet.");
    }
  };

  useEffect(() => {
    if (Date.now() > new Date(event?.closeOut) && event?.pot !== 0) {
      declareWinner();
    }
  }, [event, winningCondition]);

  // winning condition --------------

  const checkBettorList = () => {
    event?.betters.map((better) => {
      better.better._id === user._id ? setInList(true) : setInList(false);
    });
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
        <label>Title</label>
        <input
          type="text"
          value={formData.teamA}
          onChange={(e) => setFormData({ ...formData, teamA: e.target.value })}
          className="narrow-input"
          placeholder="Team A"
          required
        />
        <input
          type="text"
          value={formData.teamB}
          onChange={(e) => setFormData({ ...formData, teamB: e.target.value })}
          className="narrow-input"
          placeholder="Team B"
          required
        />
        <p>Pot: {event?.pot}</p>
        <p>Bet Amount: {event?.betAmount}</p>
        {Date.now() > new Date(event?.closeOut) && event?.pot !== 0 && (
          <button onClick={() => eventService.claim(eventId)}>
            Check Winners
          </button>
        )}
        {Date.now() < new Date(event?.closeOut) && !inList && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Winning Condition</label>
              <select
                value={formData.winningCondition}
                onChange={(e) =>
                  setFormData({ ...formData, winningCondition: e.target.value })
                }
                className="narrow-input"
                required
              >
                <option value="formData.teamA">{formData.teamA}</option>
                <option value="formData.teamB">{formData.teamB}</option>
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
