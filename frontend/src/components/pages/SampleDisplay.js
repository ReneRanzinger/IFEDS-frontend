import React, { Component } from "react";
import SideBar from "./Sidebar";
import {connect} from "react-redux";
import SampleList from "./SampleList";
import {logout} from "../../actions/auth";
import PropTypes  from 'prop-types';


class SampleDisplay extends Component {
  render() {
    return (
      <div>
        <SideBar props={this.props} isDashBoard={"true"}/>
        <SampleList prop={this.props}/>
      </div>
    );
  }
}

SampleDisplay.propTypes = {
  logout: PropTypes.func
}

function mapStateToProps(state) {
  return {isAuthenticated: state.user.token};
}
export default connect(mapStateToProps, {logout})(SampleDisplay);
