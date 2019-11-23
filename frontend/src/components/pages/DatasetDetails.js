import React, {Component} from "react";
import {connect} from "react-redux";
import Navbar from "./Navbar";
import MenuAppBar from "./MenuAppBar";

class DatasetDetails extends Component {
  render() {
    return (<div className="Content">
      <Navbar/>

    </div>);
  }
}

function mapStateToProps(state) {
  return {isAuthenticated: state.user.token};
}
export default connect(mapStateToProps)(DatasetDetails);
