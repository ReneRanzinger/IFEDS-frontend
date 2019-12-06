import React, {Component} from 'react';
import SideBar from "./Sidebar";
import DatasetTable from "./DatasetTable"

class DatasetDisplay extends Component {
    
    render() { 
        return (  <div>
            <SideBar/>
            <DatasetTable/>
        </div>);
    }
}
 
export default DatasetDisplay;