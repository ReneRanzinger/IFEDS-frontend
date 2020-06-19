import React, { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import { Reset} from "../../apiCalls";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { ForgotPassword } from "../../apiCalls";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { head } from "./head.js";
import { getMeta } from "./head.js";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { FPasswordMessage } from "./FPasswordMessage";


const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  bullet1: {
    width: "30%",
    marginTop: "8%",
    marginLeft: "35%",
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: "flex",
    justifyContent: "center"
  }
}));




export default function FPasswordLink(props) {
  const isAuthenticated = useSelector(state => state.user.token);
  const history = useHistory();
  const classes = useStyles();
  //const sidebar = useSelector(state => state.sidebar);
  const [isChanging, setIsChanging] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [fields, setFields] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      password: "",
      confirmPassword: ""
    }
  );

  
  
//  const handleChange=
 



const handleSubmit = (e) => {
    history.push("/message");
    //submit({ email: email });
    e.preventDefault();}
   // console.log(email)
fetch(`${Reset}/${email}`, {
  method: "GET",
  mode: "cors",
  headers: setAuthorizationHeader(isAuthenticated)
})
  //.then(response => response.json())
  // .then(res => {history.push("/message");})

  .catch(error => console.log(error));
      

  // const handleChangeClick = event => {
  //   event.preventDefault();
  //   setIsChanging(true);

  //   fetch(`${ForgotPassword}/${token}`, {
  //     method: "POST",
  //     mode: "cors",
  //     headers: setAuthorizationHeader(isAuthenticated),
  //     body: JSON.stringify({
  //       new_password: fields.password,
  //       confNew_password: fields.confirmPassword
  //     })
  //   })
  //     .then(res => {
  //       history.push("/login");
  //     })
  //     .catch(error => console.log(error));
  // };



return (
  <div>
    <div>
      <Helmet>
        <title>{head.reset_passwordlink.title}</title>
        {getMeta(head.reset_passwordlink)}
      </Helmet>
    </div>
    <Navbar props={props} />
    <Card className={classes.bullet1}>
      <div className="Email">
        <ValidatorForm className={classes.form}>
          <TextValidator
            variant="outlined"
            margin="normal"
            required="required"
            fullWidth="fullWidth"
            id="email"
            label="email"
            name="email"
            placeholder="Enter email"
            type="email"
            autoFocus="autoFocus"
            onChange={e => setEmail(e.target.value)}
            value={email}
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
          />

          <Button
            type="submit"
            fullWidth="fullWidth"
            variant="contained"
            color="primary"
            className={classes}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </ValidatorForm>
      </div>
    </Card>
  </div>
);
}
