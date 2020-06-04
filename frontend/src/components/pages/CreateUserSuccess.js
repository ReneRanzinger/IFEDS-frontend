import React, { Component } from "react";
import SideBar from "./Sidebar";
import { connect } from "react-redux";
import UserCreated from "./UserCreated";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

class CreateUserSuccess extends Component {
  render() {
    return (
      <div>
        <SideBar props={this.props} isDashBoard={"true"} />
        <UserCreated prop={this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { isAuthenticated: state.user.token };
}
export default connect(mapStateToProps, { logout })(CreateUserSuccess);



