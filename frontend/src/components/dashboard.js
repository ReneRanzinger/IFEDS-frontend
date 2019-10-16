import React, {Component} from 'react';
import Navbar from './navbar1.js'; 

export class dashboard extends React.Component {
    render() {
        console.log(this.props)
        return <h1>Hello!</h1>
        (
            <div>
              <navbar1/>
            </div>
          );
    }
}

export default dashboard;