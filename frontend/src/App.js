import React from 'react'
import './App.css'
import {Route} from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashBoard';
import InternalServer from './components/error_pages/InternalServer';
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import AdminRoute from "./components/routes/AdminRoute";
import DisplayDatasetDetail from "./components/pages/DisplayDatasetDetail";
import DatasetDisplay from './components/pages/DatasetDisplay';
import SampleDisplay from './components/pages/SampleDisplay';
import AddSample from "./components/pages/AddSample";
import SampleForm from "./components/forms/SampleForm";
import FileUploaderPage from "./components/pages/FileUploaderPage";
//import Editdetail from './components/pages/Editdetail';
import SampleList from "./components/pages/SampleList";
import AddSampleDisplay from './components/pages/AddSampleDisplay';
import datasettable from "./components/pages/DatasetTable";
import EditDatasetPage from './components/pages/DisplayDatasetDetail';

const App = ({ location, isAuthenticated }) => (
  <div >

    <AdminRoute location={location} path="/" exact component={HomePage} />
    <UserRoute location={location} path="/datasettable" exact component={DatasetDisplay}/>
    <UserRoute location={location} path="/datasetDetail/:id" component={DisplayDatasetDetail} />
    <UserRoute location={location} path="/samplelist" exact component={SampleDisplay} />
    <UserRoute location={location} path="/addsample" exact component={AddSampleDisplay} />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <GuestRoute location={location} path="/500" exact component={InternalServer}/>


    <UserRoute location={location} path="/editsample/:id" exact component={SampleForm}/>
    <UserRoute location={location} path="/dashboard" exact component={DashboardPage}/>
    <UserRoute location={location} path="/adddatasetfile/:id" exact component={FileUploaderPage}/>
    <UserRoute location={location} path="/editdataset/:id" exact component={EditDatasetPage}/>
   

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
