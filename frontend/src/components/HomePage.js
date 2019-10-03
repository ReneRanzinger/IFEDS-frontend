import React, { Component } from 'react';
import {connect} from 'react-redux';
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
        <h1 className='h'>MY Component</h1>
        <div><Table/></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    datasets: state.datasets
  }
}
export default connect(mapStateToProps) (HomePage);
