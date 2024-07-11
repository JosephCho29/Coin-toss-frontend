import { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import * as authService from "./services/authService";
import * as eventService from "./services/eventService";
import * as profileService from "./services/profileService";
import * as userService from './services/userService';
import SignInForm from "./components/SignInForm/SignInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import EventDetails from "./components/EventDetails/EventDetails";
import Events from "./components/Events/Events";
import CreateNewEvent from "./components/CreateNewEvent/CreateNewEvent";
import AddFriend from "./components/AddFriend/AddFriend";
import UserProfile from "./components/UserProfile/UserProfile";

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllEvents = async () => {
      const eventsData = await eventService.index();
      setEvents(eventsData);
    };
    if (user) fetchAllEvents();
  }, [navigate, user]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddEvent = async (eventFormData) => {
    const newEvent = await eventService.createEvent(eventFormData);
    setEvents([newEvent, ...events]);
    navigate("/");
  };
  const handleDeleteUser = async (userId) => {
    await userService.deleteUser(userId);
    
    setUser(null)
    navigate('/landing')
  };

  const handleAddFriend = async (friendId) => {
    await userService.addFriend(friendId);
    // await authService.updateUser(user);
    // setUser(authService.getUser());
    // console.log(user);
    navigate("/profile/" + user._id);
  };

  const handleBet = async (eventId, betFormData) => {
    await eventService.bet(eventId, betFormData);

    navigate("/events/" + eventId);
  };

  const handleUpdateEvent = async (eventId, eventFormData) => {
    console.log('eventId:', eventId, 'eventFormData:', eventFormData);

    const updateEvent = await eventService.update(eventId, eventFormData);

    setEvents(events.map((event) => (eventId === event._id ? updateEvent : event)));
    
    navigate(`/event/${eventId}`);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Events events={events} />} />
              <Route path="/events/:eventId/edit" element={<CreateNewEvent handleUpdateEvent={handleUpdateEvent} />}/>
              <Route path="/events/new" element={<CreateNewEvent handleAddEvent={handleAddEvent} />} />
              <Route path="/profile/:userId" element={<UserProfile />} />
              <Route path="/events/:eventId" element={<EventDetails handleBet={handleBet} />}/>
              <Route path="/players" element={<AddFriend handleAddFriend={handleAddFriend} />} />


            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
          <Route path="/signin" element={<SignInForm setUser={setUser} />} />
          <Route path="*" element={<h1>Page Not HERE</h1>} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
