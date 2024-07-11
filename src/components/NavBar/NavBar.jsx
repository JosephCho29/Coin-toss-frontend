import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthedUserContext } from '../../App'


// const NavBar = ({ handleSignout }) => {
//     const user = useContext(AuthedUserContext);
//     return (
//         <>
//             {user ? (
//                 <nav>
//                     <ul>
//                         <li><Link to={`/profile/${user._id}`}>PROFILE</Link></li>
//                         <li><Link to='/'>HOME</Link></li>
//                         <li><Link to='/players'>FRIENDS</Link></li>
//                         <li><Link to="/events/new">NEW BET</Link></li>
//                         <li><Link to="" onClick={handleSignout}>SIGN OUT</Link></li>
//                     </ul>
//                 </nav>
//             ) : (
//                 <nav>
//                     <ul>
//                         <li>
//                             <Link to="/signin">Sign In</Link>
//                         </li>
//                         <li>
//                             <Link to="/signup">Sign Up</Link>
//                         </li>
//                     </ul>
//                 </nav>
//             )}
//         </>
//     );
// };

const NavBar = ({ handleSignout }) => {
    const user = useContext(AuthedUserContext);
    return (
        <nav className="navbar">
            <div className="nav-left">

                {user && <Link to={`/profile/${user._id}`}>PROFILE</Link>}
                <Link to='/'>HOME</Link>
                <Link to='/players'>FRIENDS</Link>
                <Link to="/events/new">NEW BET</Link>
                <Link to="" onClick={handleSignout}>SIGN OUT</Link>

                {/* <Link to="/profile">PROFILE</Link>
          <Link to="/home">HOME</Link>
          <Link to="/friends">FRIENDS</Link>
          <Link to="/new-bet">NEW BET</Link>
          <Link to="/sign-out">SIGN OUT</Link> */}
            </div>
            <div className="nav-right">
                <span>{user?.username}</span>
                <span>TOKENS: {user?.tokens}</span>
            </div>
        </nav>
    );
};


export default NavBar; 