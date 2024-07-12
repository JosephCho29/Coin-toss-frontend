import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import * as eventService from '../../services/eventService';

const CreateNewEvent = (props) => {
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    betAmount: 0,
    description: "",
    closeOut: 0,
    winningCondition: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await eventService.show(eventId);
      setFormData(eventData);
    };
    if (eventId) fetchEvent();
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (eventId) {
      props.handleUpdateEvent(eventId, formData);
    } else {
      props.handleAddEvent(formData);
    }
    
    setFormData({
      title: "",
      betAmount: 0,
      description: "",
      closeOut: 0,
      winningCondition: "",
    }); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Bet Title:</label>
        <input
          type="text"
          className="narrow-input"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          min="0"
          step="1"
          value={formData.betAmount}
          onChange={(e) =>
            setFormData({ ...formData, betAmount: parseInt(e.target.value) })
          }
          required
        />
      </div>
      <div>
        <label>Description of the Bet:</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label>Length of the Bet:</label>
        <input
          type="number"
          min="0"
          step="1"
          className="narrow-input"
          value={formData.closeOut}
          onChange={(e) =>
            setFormData({ ...formData, closeOut: e.target.value })
          }
          required
        />
      </div>
      <div>
      <label>Winning Condition</label>
      <select
        value={formData.winningCondition}
        onChange={(e) => setFormData({ ...formData, winningCondition: e.target.value })}
        className="narrow-input"
        required
      >
        <option value="Team A">Team A</option>
        <option value="Team B">Team B</option>
      </select>

      </div>
      <button className="submit-event-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default CreateNewEvent;
