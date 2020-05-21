import React, { Component } from "react";
import SideBar from "./Sidebar";
import { connect } from "react-redux";
import EditProfilePage from "./EditProfilePage";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

class EditProfileDisplay extends Component {
  render() {
    return (
      <div>
        <SideBar props={this.props} isDashBoard={"true"} />
        <EditProfilePage prop={this.props} />
      </div>
    );
  }
}

EditProfileDisplay.propTypes = {
  logout: PropTypes.func
};

function mapStateToProps(state) {
  return { isAuthenticated: state.user.token };
}
export default connect(mapStateToProps, { logout })(EditProfileDisplay);
