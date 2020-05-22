import React, { Component } from "react";
import SideBar from "./Sidebar";
import { connect } from "react-redux";
import EditProfilePage from "./EditProfilePage";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { head } from "./head.js";
import { getMeta } from "./head.js";

class EditProfileDisplay extends Component {
  render() {
    return (
      <div>
        <SideBar props={this.props} isDashBoard={"true"} />
        <EditProfilePage prop={this.props} />
        <div>
          <Helmet>
            <title>{head.editprofile.title}</title>
            {getMeta(head.editprofile)}
          </Helmet>
        </div>
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
