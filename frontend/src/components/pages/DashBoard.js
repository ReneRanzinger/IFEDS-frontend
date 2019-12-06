import React, { Component } from 'react';
//import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
//import Navbar from './Navbar.js';
//import Sidebar from './Sidebar.js';
//import Header from './Header';
//import Content from './Content';
//import Background from './Background';
import { connect } from "react-redux";
import Navbar from './Navbar';
import MenuAppBar from './MenuAppBar';
// import DatasetTable from './DatasetTable';
import PropTypes  from 'prop-types';
import {logout} from "../../actions/auth";
import Sidebar from './Sidebar';


  class Dashboard extends Component {
    render() {

          return (
<div className="Content">
  <Sidebar props={this.props} isDashBoard={"true"}/>
  {/* <MenuAppBar props = {this.props} isDashBoard={"false"} /> */}
  {console.log(this.props)}
  {/* <DatasetTable prop={this.props} isDashBoard={"true"}/> */}
      <h1 align="center">User Profile</h1> 




                    </div>

            );
        }

    }
    Dashboard.propTypes={
      logout: PropTypes.func}


function mapStateToProps(state) {
      return {
        isAuthenticated: state.user.token
      };
    }
export default connect (mapStateToProps,{logout})(Dashboard);
