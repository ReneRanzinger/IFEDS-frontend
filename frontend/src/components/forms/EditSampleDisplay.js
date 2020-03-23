import React, { Component } from "react";
import SideBar from "../pages/Sidebar";
import { connect } from "react-redux";
import SampleForm from "./SampleForm";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { head } from "../pages/head.js";
import { getMeta } from "../pages/head.js";

class EditSampleDisplay extends Component {
  render() {
    return (
      <div>
        <SideBar props={this.props} isDashBoard={"true"} />
        <SampleForm {...this.props} />
        <div>
          <Helmet>
            <title>{head.editsampledisplay.title}</title>
            {getMeta(head.editsampledisplay)}
          </Helmet>
        </div>
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
