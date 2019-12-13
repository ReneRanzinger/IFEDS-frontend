import React, {Component} from 'react';
import SideBar from "./Sidebar";
import DatasetTable from "./DatasetTable"

class DatasetDisplay extends Component {
    
    render() { 
        return (
          <div>
            <SideBar />
            <DatasetTable />
            <h1>Here in Dataset Display</h1>
          </div>
        );
        
    }
}
 
export default DatasetDisplay;