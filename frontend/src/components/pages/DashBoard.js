import React, {Component} from 'react';
import {connect} from "react-redux";
import MenuAppBar from './MenuAppBar';
import DatasetTable from './DatasetTable';
import PropTypes from 'prop-types';
import {logout} from "../../actions/auth";

class Dashboard extends Component {
  render() {

    return (<div className="Content">
      <MenuAppBar props={this.props} isDashBoard={"true"}/>
      <DatasetTable props={this.props}/>
    </div>);
  }

}
Dashboard.propTypes = {
  logout: PropTypes.func
}

function mapStateToProps(state) {
  return {isAuthenticated: state.user.token};
}
export default connect(mapStateToProps, {logout})(Dashboard);
