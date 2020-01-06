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
        console.log("state", this.state.details);
      })
      .catch(error => console.log(error));
  }

  // render() {
  //   return (
  //     <div>
  //       {
  //         this.state.clouds.map(((cloud, index) =>
  //           <th key={`${cloud.cloud}${index}`}>
  //             <div>
  //               <div>
  //                 {cloud.cloud}
  //                 <div>
  //                   {
  //                     cloud.data_centers.map(d => (
  //                       <div>
  //                         {d.title}
  //                       </div>
  //                     ))
  //                   }
  //                 </div>
  //               </div>
  //             </div>
  //           </th>
  //         ))
  //       }
  //     </div>
  //   );
  // }

  render() {
    return (
      <div>
        <div>
        <MenuAppBar props={this.props} />
        </div>
        <div>
        <h3>{this.state.dataset.datasetId}</h3>
        <h1>{this.state.dataset.datasetName}</h1>
        <br />
        <h3>{this.state.dataset.description}</h3>
        <div>
        {this.state.dataset.map}

        </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {isAuthenticated: state.user.token};
}
export default connect(mapStateToProps)(DatasetDetails);




