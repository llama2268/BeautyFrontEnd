import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
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
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
