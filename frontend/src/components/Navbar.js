import React from 'react';
import {Link} from 'react-router-dom';
/**
 * Navbar component to display Navigation on HomePage
 */

const  Navbar = () => (
  <header className="navbar">
    <nav className="navbar__navigation">
      <div />
      <div className="navbar__logo">
        <Link to='/'>IFEDS</Link>
      </div>
      <div className="spacer" />
      <div className="navbar_navigation-items">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Navbar;
