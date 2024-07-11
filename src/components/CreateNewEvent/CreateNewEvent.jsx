import React, { useState } from "react";
import './CreateNewEvent.css';
const CreateNewEvent = (props) => {
 const [title, setTitle] = useState("");
 const [betAmount, setBetAmount] = useState(0);
 const [description, setDescription] = useState("");
 const [closeOut, setCloseOut] = useState(0);
 const [winningCondition, setWinningCondition] = useState("");


 const handleSubmit = (e) => {
   e.preventDefault();
   const newEvent = {
     title,
     betAmount,
     description,
     closeOut,
     winningCondition,
   };
   props.handleAddEvent(newEvent);
    // Reset form
   setTitle("");
   setBetAmount(0);
   setDescription("");
   setCloseOut(0);
   setWinningCondition("");
 };


 return (
   <form onSubmit={handleSubmit}>
     <div>
       <label>Bet Title:</label>
       <input
         type="text"
         className="narrow-input"
         value={title}
         onChange={(e) => setTitle(e.target.value)}
         required
       />
     </div>
     <div>
       <label>Amount:</label>
       <input
         type="number"
         value={betAmount}
         onChange={(e) => setBetAmount(e.target.value)}
         required
       />
     </div>
     <div>
       <label>Description of the Bet:</label>
       <textarea
         value={description}
         onChange={(e) => setDescription(e.target.value)}
         required
       />
     </div>
     <div>
       <label>Length of the Bet:</label>
       <input
         type="text"
         className="narrow-input"
         value={closeOut}
         onChange={(e) => setCloseOut(e.target.value)}
         required
       />
     </div>
     <div>
       <label>Win Condition:</label>
       <input
         type="text"
         className="narrow-input"
         value={winningCondition}
         onChange={(e) => setWinningCondition(e.target.value)}
         required
       />
     </div>
     <button className="submit-event-button" type="submit">Submit</button>
   </form>
 );
};


export default CreateNewEvent;