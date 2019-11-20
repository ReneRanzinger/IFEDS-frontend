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
<<<<<<< HEAD
import Navbar from './Navbar';
import MenuAppBar from './MenuAppBar';
import DatasetTable from './DatasetTable';
import PropTypes  from 'prop-types';
import {logout} from "../../actions/auth";

=======
import CreateSampleForm from '../forms/CreateSampleForm';
import MenuAppBar from './MenuAppBar';
import SampleList from './SampleList';
>>>>>>> a02261dd43fbfa0a7f68933eafae93f0920e5de7

//<DatasetTable prop = {this.props}/>
//<CreateSampleForm prop = {this.props}/>
  class Dashboard extends Component {
    render() {

          return (
<div className="Content">
<<<<<<< HEAD
  <MenuAppBar props = {this.props} isDashBoard={"true"} />
  {console.log(this.props)}
  <DatasetTable prop={this.props} isDashBoard={"true"}/>
  
=======
  <MenuAppBar props = {this.props} />
>>>>>>> a02261dd43fbfa0a7f68933eafae93f0920e5de7

<SampleList prop ={this.props}/>



                    </div>

            );
        }

    }
<<<<<<< HEAD
    Dashboard.propTypes={
      logout: PropTypes.func}

=======
Dashboard.propTypes = {
  logout: PropTypes.func
}
>>>>>>> a02261dd43fbfa0a7f68933eafae93f0920e5de7

function mapStateToProps(state) {
      return {
        isAuthenticated: state.user.token
      };
    }
export default connect (mapStateToProps,{logout})(Dashboard);
