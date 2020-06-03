import React, {Component} from 'react';
import SideBar from "./Sidebar";
import {connect} from "react-redux";
import DatasetTable from "./DatasetTable"
import {logout} from "../../actions/auth";
import PropTypes  from 'prop-types';
import { Helmet } from "react-helmet";
import { head } from "./head.js";
import { getMeta } from "./head.js";

class DatasetDisplay extends Component {

    render() {
        return (
          <div>
            <SideBar props={this.props} isDashBoard={"true"} />
            <DatasetTable prop={this.props} />
            <div>
              <Helmet>
                <title>{head.datasettabledisplay.title}</title>
                {getMeta(head.datasettabledisplay)}
              </Helmet>
            </div>
          </div>
        );

    }
}

DatasetDisplay.propTypes = {
  logout: PropTypes.func
}

function mapStateToProps(state) {
  return {isAuthenticated: state.user.token};
}
export default connect(mapStateToProps, {logout})(DatasetDisplay);
