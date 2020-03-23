import React, { Component } from 'react';
import Table from './Table.js';
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import MenuAppBar from './MenuAppBar.js';
import Sidebar from './Sidebar.js';
import { Helmet } from "react-helmet";
import {head} from "./head.js";
import {getMeta} from "./head.js";



class HomePage extends Component {
  //submit = () => this.props.logout().then(() => this.props.history.push("/"));
  render() {
    console.log(this.props)
    return (
      <div>
        <div>
          <Helmet>
            <title>{head.home.title}</title>
            {getMeta(head.home)}
          </Helmet>
        </div>

        {this.props.isAuthenticated ? (
          <div>
            <Sidebar props={this.props} />
          </div>
        ) : (
          <div>
            <MenuAppBar props={this.props} />
          </div>
        )}
        <div>
          <Table prop={this.props} />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.object.isRequired,
  logout:PropTypes.func,
  dispatch: PropTypes.func
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.token
  };
}
export default connect(mapStateToProps,{logout})(HomePage);
