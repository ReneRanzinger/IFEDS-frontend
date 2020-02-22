import React, {Component} from 'react';
import SideBar from "./Sidebar";
import {connect} from "react-redux";
import DatasetTable from "./DatasetTable"
import {logout} from "../../actions/auth";
import PropTypes  from 'prop-types';

class DatasetDisplay extends Component {

    render() {
        return (
          <div>
            <SideBar props={this.props} isDashBoard={"true"} />
            <DatasetTable prop={this.props}/>

          </div>
        );

    }
}

DatasetDisplay.propTypes = {
  logout: PropTypes.func
}

function mapStateToProps(state) {
  return {isAuthenticated: state.user.token};
}
export default connect(mapStateToProps, {logout})(DatasetDisplay);
