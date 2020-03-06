import React, { Component } from "react";
import SideBar from "./Sidebar";
import { connect } from "react-redux";
import AddSample from "./AddSample";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

class AddSampleDisplay extends Component {
  render() {
    return (
      <div>
        <SideBar props={this.props} isDashBoard={"true"} />
        <AddSample {...this.props} />
        <div>
          <Helmet>
            <title>AddSample</title>
            <meta name="description" content="Display Add Sample form " />
            <meta name="theme-color" content="#008f68" />
          </Helmet>
          {/* ... */}
        </div>
      </div>
    );
  }
}

AddSampleDisplay.propTypes = {
  logout: PropTypes.func
};

function mapStateToProps(state) {
  return { isAuthenticated: state.user.token };
}
export default connect(mapStateToProps, { logout })(AddSampleDisplay);
