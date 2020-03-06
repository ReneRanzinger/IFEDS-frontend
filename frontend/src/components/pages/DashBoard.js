import React, {Component} from 'react';
import {connect} from "react-redux";
import MenuAppBar from './MenuAppBar';
// import DatasetTable from './DatasetTable';
import PropTypes  from 'prop-types';
import {logout} from "../../actions/auth";
import Sidebar from './Sidebar';
import { Helmet } from "react-helmet";

class Dashboard extends Component {
  render() {
          return (
            <div className="Content">
              <Sidebar props={this.props} isDashBoard={"true"} />
              {/* <MenuAppBar props = {this.props} isDashBoard={"false"} /> */}
              {console.log(this.props)}
              {/* <DatasetTable prop={this.props} isDashBoard={"true"}/> */}
              <h1 align="center">User Profile</h1>
              <div>
                <Helmet>
                  <title>DashBoard</title>
                  <meta name="description" content="Display DashBoard" />
                  <meta name="theme-color" content="#008f68" />
                </Helmet>
                {/* ... */}
              </div>
            </div>
          );
        }
}
Dashboard.propTypes = {
  logout: PropTypes.func
}

function mapStateToProps(state) {
  return {isAuthenticated: state.user.token};
}
export default connect(mapStateToProps, {logout})(Dashboard);
