import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthedUserContext } from '../../App'


const NavBar = ({ handleSignout }) => {
    const user = useContext(AuthedUserContext);
    return (
        <>
            {user ? (
                <nav>
                    <ul>
                        <li><Link to='/'>HOME</Link></li>
                        <li><Link to='#'>FRIENDS</Link></li>
                        <li>
                            <Link to="/events/new">NEW BET</Link></li>
                        <li>
                            <Link to="" onClick={handleSignout}>SIGN OUT</Link>
                        </li>

                    </ul>
                </nav>
            ) : (
                <nav>
                    <ul>
                        <li>
                            <Link to="/signin">Sign In</Link>
                        </li>
                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
};




export default NavBar; 