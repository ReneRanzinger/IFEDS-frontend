import React from 'react'
import './App.css'
import {Route} from 'react-router-dom';
import { connect, useDispatch } from "react-redux";
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
import FileUploaderPage from "./components/pages/FileUploaderPage";
import AddSampleDisplay from './components/pages/AddSampleDisplay';
import AddDatasetDisplay from './components/pages/AddDatasetDisplay';
import EditDatasetPage from './components/pages/EditDatasetPage';
import EditSampleDisplay from './components/forms/EditSampleDisplay';
import PasswordChange from './components/pages/PasswordChange';
import {APPLICATION_SETTING}  from "./types";
import {Setting} from './apiCalls'


const applicationSetting = data => ({
  type: APPLICATION_SETTING,
  data
});

const useHandleSetting = () => {
  const dispatch = useDispatch()
  fetch(Setting, {
    method: "GET",
    mode: 'cors'
  }).then(response => response.json()).then(res => {
    dispatch(applicationSetting(res))
  }).catch(error => console.log(error))

}

const App = ({ location, isAuthenticated }) => {
  useHandleSetting()
  return (
    <div>
      <AdminRoute location={location} path="/" exact component={HomePage} />
      <UserRoute
        location={location}
        path="/datasettable"
        exact
        component={DatasetDisplay}
      />
      <Route
        location={location}
        path="/datasetDetail/:id"
        component={DisplayDatasetDetail}
      />
      <UserRoute
        location={location}
        path="/samplelist"
        exact
        component={SampleDisplay}
      />
      <UserRoute
        location={location}
        path="/addsample"
        exact
        component={AddSampleDisplay}
      />
      <GuestRoute
        location={location}
        path="/login"
        exact
        component={LoginPage}
      />
      <GuestRoute
        location={location}
        path="/500"
        exact
        component={InternalServer}
      />
      <UserRoute
        location={location}
        path="/editsample/:id"
        exact
        component={EditSampleDisplay}
      />
      <UserRoute
        location={location}
        path="/dashboard"
        exact
        component={DashboardPage}
      />
      <UserRoute
        location={location}
        path="/adddatasetfile/:id"
        exact
        component={FileUploaderPage}
      />
      <UserRoute
        location={location}
        path="/editdataset/:id"
        exact
        component={EditDatasetPage}
      />
      <UserRoute
        location={location}
        path="/adddataset"
        exact
        component={AddDatasetDisplay}
      />
      <UserRoute
        location={location}
        path="/passwordchange"
        exact
        component={PasswordChange}
      />
     
    </div>
  );};

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
