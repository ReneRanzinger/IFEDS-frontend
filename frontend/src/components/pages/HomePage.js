import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Table from './Table.js';
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import MenuAppBar from './MenuAppBar.js';

/**
 * HomePage
 */
 const headCells = [
   { id: 'datasetName', numeric: false, disablePadding: false, label: 'Dataset Name' },
   { id: 'providerName', numeric: false, disablePadding: false, label: 'Author' },
   { id: 'sampleName', numeric: false, disablePadding: false, label: 'Sample Name' },
   { id: 'description', numeric: false, disablePadding: false, label: 'Dataset Description' },
 ];

export class HomePage extends Component {
  submit = () => this.props.logout().then(() => this.props.history.push("/"));
  render() {
    console.log(this.props)
    return (
      <div>
        <div><MenuAppBar props ={this.props} submit={this.submit}/></div>
        <div><Table headCell ={headCells} prop={this.props}/></div>
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.object.isRequired,
  logout:PropTypes.func,
  dispatch: PropTypes.func
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.token
  };
}
export default connect(mapStateToProps,{logout})(HomePage);
