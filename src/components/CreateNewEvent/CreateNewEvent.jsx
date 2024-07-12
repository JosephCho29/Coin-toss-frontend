import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import * as eventService from '../../services/eventService';
import "./CreateNewEvent.css"; 

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
    <form onSubmit={handleSubmit} className="create-new-event-form">
      <div>
        <label>Bet Title</label>
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
          onChange={(e) =>
            setFormData({ ...formData, winningCondition: e.target.value })
          }
          className="narrow-input"
          required
        >
          <option value={formData.teamA}>{formData.teamA}</option>
          <option value={formData.teamB}>{formData.teamB}</option>
        </select>
      </div>
      <div className="button-container">
        <button className="submit-event-button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateNewEvent;
