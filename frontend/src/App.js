import React from 'react'
import './App.css'
import {Route} from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashBoard';
import Navbar from './components/pages/Navbar';
//import DatasetContextProvider from './contexts/DatasetContext'
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";



const App = ({ location, isAuthenticated }) => (
  <div >
    {isAuthenticated && <Navbar />}
    <GuestRoute location={location} path="/" exact component={HomePage} />

    <GuestRoute location={location} path="/login" exact component={LoginPage} />

    <UserRoute
        location={location}
        path="/dashboard"
        exact
        component={DashboardPage}
      />



  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps)(App);
