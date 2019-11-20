import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import MenuAppBar from "./MenuAppBar"; 
=======

>>>>>>> a02261dd43fbfa0a7f68933eafae93f0920e5de7

import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth";
import Navbar from "./Navbar";


class LoginPage extends React.Component {
  submit = data => this.props.login(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div>
<<<<<<< HEAD
        <Navbar props={this.props} />
        <LoginForm submit={this.submit} />
=======

          <LoginForm submit={this.submit} />

>>>>>>> a02261dd43fbfa0a7f68933eafae93f0920e5de7
      </div>
    );
  }
}


LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.token
  };
}

export default connect(null, { login })(LoginPage);
