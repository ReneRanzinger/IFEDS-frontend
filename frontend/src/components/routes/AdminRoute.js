import React from "react";
import {useSelector} from 'react-redux';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect} from "react-router-dom";

const AdminRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  const level = useSelector(state => state.user.permission_level)
  return (<Route
    {...rest}
    render={props =>
      level === "admin" ? <Component {...props} /> : <Redirect to="/"/> }
  />)
};

AdminRoute.propTypes = {
  component: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps)(AdminRoute);
