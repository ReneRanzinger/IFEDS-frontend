import React, { Component } from 'react';
//import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
//import Navbar from './Navbar.js';
//import Sidebar from './Sidebar.js';
//import Header from './Header';
//import Content from './Content';
//import Background from './Background';
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatasetTable from './DatasetTable';
import MenuAppBar from './MenuAppBar'


  class Dashboard extends Component {
    render() {

          return (
<div className="Content">
  <MenuAppBar props = {this.props} />
<DatasetTable prop = {this.props}/>




                    </div>

            );
        }

    }
Dashboard.propTypes = {
  logout: PropTypes.func
}

function mapStateToProps(state) {
      return {
        isAuthenticated: state.user.token
      };
    }
export default connect (mapStateToProps,{logout})(Dashboard);
