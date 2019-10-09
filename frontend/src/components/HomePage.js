import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Table from './Table.js';

/**
 * HomePage
 */
export class HomePage extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <Navbar/>
        <div className = "h"><Table/></div>
      </div>
    );
  }
}

export default HomePage;
