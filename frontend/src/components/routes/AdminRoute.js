import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route} from "react-router-dom";

const AdminRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      <Component {...props} /> }
  />
);

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
