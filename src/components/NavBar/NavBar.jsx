import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthedUserContext } from "../../App";
import "./NavBar.css";


const NavBar = ({ handleSignout }) => {
    const user = useContext(AuthedUserContext);
    return (
        <nav className="navbar">
            <div className="nav-left">

                {user && <Link to={`/profile/${user._id}`}>PROFILE</Link>}
                <Link to='/'>HOME</Link>
                <Link to='/players'>ADD FRIENDS</Link>
                <Link to="/events/new">CREATE EVENT</Link>
                <Link to="" onClick={handleSignout}>SIGN OUT</Link>
            </div>
            <div className="nav-right">
                <span>{user?.username}</span>
                <span>TOKENS: {user?.tokens}</span>
            </div>
        </nav>
    );
};


export default NavBar; 

