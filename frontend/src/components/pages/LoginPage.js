import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";


class LoginPage extends React.Component {
  submit = data => this.props.login(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div>
        <div>
          <Helmet>
            <title>LoginPage</title>
            <meta name="description" content="LoginForm" />
            <meta name="theme-color" content="#008f68" />
          </Helmet>
          {/* ... */}
        </div>
        <Navbar props={this.props} />
        <LoginForm submit={this.submit} />
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

export default connect(null, { login })(LoginPage);
