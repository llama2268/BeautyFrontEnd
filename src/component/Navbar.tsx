import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Celestique</Link>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
