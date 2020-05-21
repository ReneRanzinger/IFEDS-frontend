import React, { Component } from "react";
import SideBar from "./Sidebar";
import { connect } from "react-redux";
import CreateUser from "../forms/CreateUser";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

class CreateUserDisplay extends Component {
  render() {
    return (
      <div>
        <SideBar props={this.props} isDashBoard={"true"} />
        <CreateUser prop={this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { isAuthenticated: state.user.token };
}
export default connect(mapStateToProps, { logout })(CreateUserDisplay);



