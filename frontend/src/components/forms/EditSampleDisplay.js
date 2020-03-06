import React, { Component } from "react";
import SideBar from "../pages/Sidebar";
import { connect } from "react-redux";
import SampleForm from "./SampleForm";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";


class EditSampleDisplay extends Component {
  render() {
    return (
      <div>
        <SideBar props={this.props} isDashBoard={"true"} />
        <SampleForm {...this.props} />
      </div>
    );
  }
}

EditSampleDisplay.propTypes = {
  logout: PropTypes.func
};

function mapStateToProps(state) {
  return { isAuthenticated: state.user.token };
}
export default connect(mapStateToProps, { logout })(EditSampleDisplay);
