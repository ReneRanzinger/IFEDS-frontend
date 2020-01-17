import React, { Component } from "react";
//import PropTypes from 'prop-types';
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
  constructor() {
    super();
    this.state = {
      dataset: [],
      error: null
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    fetch(`http://localhost:8080/dataset/${params.id}`)
      .then(response => {
        return response.json();
      })

      .then(details => {
        this.setState({ dataset: details });
        console.log("state", this.state.details.value);
        console.log(JSON.stringify("state"));
      })
      .catch(error => console.log(error));
  }

  

  render() {
    return (
      <div>
        <div>
          <MenuAppBar props={this.props} />
        </div>
        <div>
          <h1 align="center" style={{ color: "green" }}>
            {this.state.dataset.datasetName}
          </h1>

          <h3 align="center">{this.state.dataset.description}</h3>
          <div>
            <h3 style={{ color: "red" }}>
              {JSON.stringify(
                this.state.dataset.sample && this.state.dataset.sample.name
              )}
            </h3>
            <h3>
              {JSON.stringify(
                this.state.dataset.sample &&
                  this.state.dataset.sample.description
              )}
            </h3>
          </div>
          <div>
            <h3>
              {this.state.dataset.sample &&
                this.state.dataset.sample.sampleDescriptors.map(
                  (item, index) => {
                   return JSON.stringify(item);
                    
                  }
                )}
            </h3>
          </div>
          <div>
            <h3>{JSON.stringify(this.state.dataset.provider)}</h3>
          </div>
          {/* <div>
            <h3>
              {this.state.dataset &&
                this.state.dataset.papers.map(
                  (item,index)=>{
                  return JSON.stringify(item);
                })

              }
            </h3>
          </div> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {isAuthenticated: state.user.token};
}
export default connect(mapStateToProps)(DatasetDetails);




