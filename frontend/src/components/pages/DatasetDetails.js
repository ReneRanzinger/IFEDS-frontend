import React, { Component } from "react";
import PropTypes from 'prop-types';
//import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
//import Navbar from './Navbar.js';
//import Sidebar from './Sidebar.js';
//import Header from './Header';
//import Content from './Content';
//import Background from './Background';
import { connect } from "react-redux";
import MenuAppBar from "./MenuAppBar";
//import datasetDetail from '../../datasetDetail.json';


class DatasetDetails extends Component {

  constructor(){
    super();
      this.state = {
        dataset: [],
      }
  }
  
  
  componentDidMount() {
    const { match: { params } } = this.props;
    fetch(`http://localhost:8080/dataset/${params.id}`)
      .then((response) => response.json())
      .then(details => {
        console.log(details.sampleDescriptors)
        this.setState({ dataset:details.sampleDescriptors,
         });

      })
      
  }


  render() {
    return (
      <div>
        <MenuAppBar props={this.props} />
        {this.state.dataset.map((item, key) => (
          <div>
            <span>{item.sampleDescriptorId}</span>
            <span>{item.name}</span>
            <span>{item.description}</span>
            <span>{item.namespace}</span>
          </div>
        ))}
        <h3>{this.state.dataset.datasetId}</h3>
        <h1>{this.state.dataset.datasetName}</h1>
        <br />
        <h3>{this.state.dataset.description}</h3>

        {/* 
        {this.state.dataset.map(function(item, index) {
          return (
            <div key={index}>
              <p>
                <span>{item.sample.name}</span>
                <span>{item.sample.description}</span>
                <span>{item.sample.url}</span>
              </p>
            </div>
          );
        })} */}
      </div>
    );
  }



 
}

function mapStateToProps(state) {
  return {isAuthenticated: state.user.token};
}
export default connect(mapStateToProps)(DatasetDetails);
