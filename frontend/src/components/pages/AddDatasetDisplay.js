import React, { Component } from "react";
import SideBar from "./Sidebar";
import { connect } from "react-redux";
import AddDataset from "./AddDataset1";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { head } from "./head.js";
import { getMeta } from "./head.js";

class AddDatasetDisplay extends Component {
  render() {
    return (
      <div>
        <SideBar props={this.props} isDashBoard={"true"} />
        <AddDataset {...this.props} />
        <div>
          <Helmet>
            <title>{head.adddatasetdisplay.title}</title>
            {getMeta(head.datasetdisplay)}
          </Helmet>
        </div>
      </div>
    );
  }
}

AddDatasetDisplay.propTypes = {
  logout: PropTypes.func
};

function mapStateToProps(state) {
  return { isAuthenticated: state.user.token };
}
export default connect(mapStateToProps, { logout })(AddDatasetDisplay);
