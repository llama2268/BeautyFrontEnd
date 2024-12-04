import { signOut } from 'firebase/auth';
import { auth } from '../pages/firebaseClient';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

interface UserProps {
  user: boolean;
}

const Navbar  = (props:UserProps)  => {
  const navigate = useNavigate();
  const user = props
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User successfully logged out');
      navigate('/account');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ul className="navbar-menu">
          <li>
            <Link to="/about">ABOUT</Link>
            <Link to="/account">ACCOUNT</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-logo">
        <Link to="/">CELESTIQUE</Link>
      </div>
      <div className="navbar-right">
        <ul className="navbar-menu">
          <li>
            <Link to='/book'>BOOK</Link>
            <Link to="/contact">CONTACT</Link>
            {user && (<button className="logout-button" onClick={handleLogout}>LOGOUT</button>)}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
