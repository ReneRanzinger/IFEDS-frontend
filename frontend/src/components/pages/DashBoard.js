import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes  from 'prop-types';
import {logout} from "../../actions/auth";
import Sidebar from './Sidebar';
import { Helmet } from "react-helmet";
import { head } from "./head.js";
import { getMeta } from "./head.js";
import DashboardDetail from "./DashboardDetail"

class Dashboard extends Component {
  render() {
          return (
            <div className="Content">
              <Sidebar props={this.props} isDashBoard={"true"} />
              <DashboardDetail {...this.props} />
              <div>
                <Helmet>
                  <title>{head.dashboard.title}</title>
                  {getMeta(head.dashboard)}
                </Helmet>
                
              </div>
            </div>
          );
        }


}
Dashboard.propTypes = {
  logout: PropTypes.func
}

function mapStateToProps(state) {
  return {isAuthenticated: state.user.token};
}
export default connect(mapStateToProps, {logout})(Dashboard);
