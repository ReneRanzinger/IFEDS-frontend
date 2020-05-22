import React, { Component } from "react";
import SideBar from "./Sidebar";
import { connect } from "react-redux";
import UserPermission from "./UserPermission";
import { logout } from "../../actions/auth";
import { Helmet } from "react-helmet";
import { head } from "./head.js";
import { getMeta } from "./head.js";
import PropTypes from "prop-types";


class DisplayUserPermission extends Component {
  render() {
    return (
      <div>
        <SideBar props={this.props} isDashBoard={"true"} />
        <UserPermission prop={this.props} />
        <div>
          <Helmet>
            <title>{head.userpermission.title}</title>
            {getMeta(head.userpermission)}
          </Helmet>
        </div>
      </div>
    );
  }
};

DisplayUserPermission.propTypes = {
  logout: PropTypes.func
};

function mapStateToProps(state) {
  return { isAuthenticated: state.user.token };
}

export default connect(mapStateToProps, { logout })(DisplayUserPermission);
