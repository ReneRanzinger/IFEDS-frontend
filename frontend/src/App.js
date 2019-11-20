import React from 'react'
import './App.css'
import {Route} from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashBoard';
import Navbar from './components/pages/Navbar';
import MenuAppBar from './components/pages/MenuAppBar';
import InternalServer from './components/error_pages/InternalServer';
//import DatasetContextProvider from './contexts/DatasetContext'
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import AdminRoute from "./components/routes/AdminRoute";
import DatasetTable from './components/pages/DatasetTable';
import SampleList from './components/pages/SampleList';
import DatasetDetails from "./components/pages/DatasetDetails";



const App = ({ location, isAuthenticated }) => (
  <div >

    <AdminRoute location={location} path="/" exact component={HomePage} />
    <Route location={location} path="/dahsboard/datasettable" exact component={DatasetTable}/> 
    <Route location={location} path="/datasetdetails" exact component={DatasetDetails} />
    <Route location={location} path="/dashboard/samplelist" exact component={SampleList} />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <GuestRoute location={location} path="/500" exact component={InternalServer}/>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  logout:PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
    
  };
}

export default connect(mapStateToProps)(App);
