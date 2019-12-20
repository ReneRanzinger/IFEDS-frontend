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

  state = {
    dataset: []
  };

  componentDidMount() {
    const { match: { params } } = this.props;
    fetch(`http://localhost:8080/dataset/${params.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ dataset: data });
      })
      .catch(console.log);
  }


  render() {
    return (
      <div>
        <MenuAppBar props={this.props} />
        <div>

            <h1>{this.state.dataset.datasetName}</h1><br/>

            <h3>{this.state.dataset.description}</h3>
             {this.state.dataset.map}


        </div>
      </div>
    );
  }



  // <div className="Content">
  //   <MenuAppBar props={this.props} />
  //   {console.log(this.props)}
  //   <ul>
  //     {Object.keys(element3).map((v, i) => (
  //       <li key={i}>
  //         {" "}
  //         {v} {datasetDetail[v]}
  //       </li>
  //     ))}
  //   </ul>
  // </div>
  //   );
}
//}
// {datasetDetail.sampleDescriptor.map((a, i)=>{
//               return(
//                 {a.sampleDescriptor.map(function(descriptor, i){
//                   return <div key={i}>
//                   <h5>{descriptor.sampleDescriptorId}</h5>
//                   <span>{descriptor.name}</span>
//                   <span>{descriptor.description}</span>
//                   <span>{descriptor.namespace}</span>
//                   <span>{descriptor.url}</span>
//                   <span>{descritpor.linkpattern}</span>
//                   </div>
//                 })}
//               )
//             })}

// DatasetDetails.propTypes ={
//   sample: PropTypes.object,
//   name: PropTypes.object
// }

function mapStateToProps(state) {
  return {isAuthenticated: state.user.token};
}
export default connect(mapStateToProps)(DatasetDetails);
