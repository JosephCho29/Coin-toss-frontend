import { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import * as authService from "./services/authService";
import * as eventService from "./services/eventService";
import * as profileService from "./services/profileService";
import SignInForm from "./components/SignInForm/SignInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import NavBar from "./components/NavBar/NavBar";
import FriendList from "./components/FriendList/FriendList";
import EventDetails from "./components/EventDetails/EventDetails";
import Events from "./components/Events/Events";
import CreateNewEvent from "./components/CreateNewEvent/CreateNewEvent";

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
  }, [user]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddEvent = async (eventFormData) => {
    const newEvent = await eventService.createEvent(eventFormData);
    setEvents([newEvent, ...events]);
    navigate("/");
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />

        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Events events={events} />} />
              {/* <Route path="/profile/:userId" element={<UserProfile user={user} />} />  */}
              <Route path="/events/:eventId" element={<EventDetails />} />
              <Route path="/events/new" element={<CreateNewEvent handleAddEvent={handleAddEvent} />} />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
          <Route path="/signin" element={<SignInForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
