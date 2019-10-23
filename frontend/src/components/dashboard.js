import React, { Component } from 'react';  
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'; 
import Navbar1 from './Navbar1.js'; 
import Sidebar from './Sidebar.js';



  class Dashboard extends Component {  
    render() {  
  
        return (  
            <div class="row" className="mb-2 pageheading"> 
                
               <Sidebar/>  
            </div>  
        );  
    }  
}  
  
export default Dashboard; 