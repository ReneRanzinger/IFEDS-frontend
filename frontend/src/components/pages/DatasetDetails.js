import React, { Component } from "react";
//import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
//import Navbar from './Navbar.js';
//import Sidebar from './Sidebar.js';
//import Header from './Header';
//import Content from './Content';
//import Background from './Background';
import { connect } from "react-redux";
//import Navbar from "./Navbar";
import MenuAppBar from "./MenuAppBar";



class DatasetDetails extends Component {
  render() {
    return (
      <div className="Content">
        <MenuAppBar props={this.props} />

       
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.token
  };
}
export default connect(mapStateToProps)(DatasetDetails);
