import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Table from './Table.js';

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
  render() {
    console.log(this.props)
    return (
      <div>
        <div><Navbar to="yes"/></div>
        <div><Table headCell ={headCells}/></div>
      </div>
    );
  }
}

export default HomePage;
