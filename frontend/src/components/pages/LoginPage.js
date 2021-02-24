import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { head } from "./head.js";
import { getMeta } from "./head.js";


class LoginPage extends React.Component {
  this.submit = data => this.props.login(data).then(() => this.props.history.push("/dashboard"));
   


  render() {
    return (
      <div>
        <div>
          <Helmet>
            <title>{head.login.title}</title>
            {getMeta(head.login)}
          </Helmet>
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
