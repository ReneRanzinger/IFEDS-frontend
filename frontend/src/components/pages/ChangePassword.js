import React, { useState,useEffect} from "react";
import { Auth } from "aws-amplify";
import {useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl } from "react-bootstrap";
import {ControlLabel} from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./ChangePassword.css";
//import Sidebar from './Sidebar';
import PropTypes from "prop-types";
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import {Password} from '../../apiCalls';
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles(theme => ({
  
  bullet1: {
    width: "30%",
    marginTop: "8%",
    marginLeft: "35%",
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display:'flex', justifyContent:'center'
  },

}));





export default function ChangePassword(props) {
 const isAuthenticated = useSelector(state => state.user.token);
  const history = useHistory();
  const classes = useStyles();
  const sidebar = useSelector(state => state.sidebar);

  const handleFieldChange =(e) => {
    name = e.target.name;
    value = e.target.value;
    setAuthorizationHea
  }
  
  const [isChanging, setIsChanging] = useState(false);

  // const [fields, handleFieldChange] = useReducer((){
  //   password: "",
  //   oldPassword: "",
  //   confirmPassword: ""
  // });




  // const useFetch = Password => {
  //   const isAuthenticated = useSelector(state => state.user.token);

  //   useEffect(() => {
  //     , [isAuthenticated, Password]);
  // };
  

  function validateForm() {
    return (
      fields.oldPassword.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  const handleChangeClick = (event) => {
    event.preventDefault();

    setIsChanging(true);

    fetch(Password, {
        method: "POST",
        mode: "cors",
        headers: setAuthorizationHeader(isAuthenticated),
        body: {
          new_password: fields.password,
          old_password: fields.oldpassword
        }
      })
        .then(response => response.json())
        .then(res => {
          history.push("/dashboard");
        })
        .catch(error => console.log(error));
    
   
  }

  
  
      
    
    // history.push("/settings");
  
 
  // ChangePassword.propTypes = {
  //   logout: PropTypes.func
  // };
  


  return (
    <div className={sidebar ? classes.root1 : classes.root}>
      <Card className={classes.bullet1}>
        <div className="ChangePassword">
          <form onSubmit={handleChangeClick}>
            <FormGroup bsSize="large" controlId="oldPassword">
              <ControlLabel>Old Password :</ControlLabel>
              <FormControl
                variant="outlined"
                margin="normal"
                required="required"
                fullWidth="fullWidth"
                type="password"
                onChange={handleFieldChange}
                value={fields.oldPassword}
              />
            </FormGroup>

            <FormGroup bsSize="large" controlId="password">
              <ControlLabel>New Password :</ControlLabel>
              <FormControl
                variant="outlined"
                margin="normal"
                required="required"
                fullWidth="fullWidth"
                type="password"
                onChange={handleFieldChange}
                value={fields.password}
              />
            </FormGroup>
            <FormGroup bsSize="large" controlId="confirmPassword">
              <ControlLabel>Confirm Password :</ControlLabel>
              <FormControl
                variant="outlined"
                margin="normal"
                required="required"
                fullWidth="fullWidth"
                type="password"
                onChange={handleFieldChange}
                value={fields.confirmPassword}
              />
            </FormGroup>
            <LoaderButton
              block
              type="submit"
              bsSize="large"
              disabled={!validateForm()}
              isLoading={isChanging}
            >
              Change Password
            </LoaderButton>
          </form>
        </div>
      </Card>
    </div>
  );
  
}

