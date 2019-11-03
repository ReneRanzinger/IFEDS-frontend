import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
/**
 * Navbar component to display Navigation on HomePage
 */

const  Navbar = ({user, logout}) => (

  <header className="navbar">
    <nav className="navbar__navigation">
      <div />
      <div className="navbar__logo">
        <Link to='/'>IFEDS</Link>
      </div>
      <div className="spacer" />
      <div className="navbar_navigation-items" >
        <ul>
          <li>
            {
             user === ""? <Link to="/login">Login</Link>:<Link to="/login">Login</Link>
//onClick={() => logout()
      }

          </li>
        </ul>
      </div>
    </nav>
  </header>
);
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  Navbar
);
