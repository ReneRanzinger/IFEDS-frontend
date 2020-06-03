import React, { useState, useEffect, useReducer } from "react";
import {useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import {Password} from '../../apiCalls';
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";



 const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
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
    display:'flex', justifyContent:'center'
  }
}));






export default function ChangePassword(props) {
 const isAuthenticated = useSelector(state => state.user.token);
  const history = useHistory();
  const classes = useStyles();
  const sidebar = useSelector(state => state.sidebar);
  const [isChanging, setIsChanging] = useState(false);
   const [open, setOpen] = React.useState(false);
  const [fields, setFields] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      password: "",
      oldPassword: "",
      confirmPassword: ""
    }
  );

 
    const handleFieldChange = (e) => {
     
        const name = e.target.name;
        const value = e.target.value;
        setFields({[name]: value });
    }

   const handleClose = () => {
     history.push("/dashboard");
      setOpen(false);
   };


    const handleClickOpen = () => {
      setOpen(true);
    };

   
    


  const handleChangeClick = (event) => {
    event.preventDefault();
    setIsChanging(true);

    fetch(Password, {
        method: "POST",
        mode: "cors",
        headers: setAuthorizationHeader(isAuthenticated),
        body:JSON.stringify({
          "new_password": fields.password,
          "old_password": fields.oldPassword
        })
        
      })
        .then(res => {
         
          history.push("/displaychangepassword");
        })
        .catch(error => console.log(error));
    
   
  }

return (
  <div className={sidebar ? classes.root1 : classes.root}>
    <Card className={classes.bullet1}>
      <div className="ChangePassword">
        <form className={classes.form} onSubmit={e => handleChangeClick(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required="required"
            fullWidth="fullWidth"
            id="oldPassword"
            label="OldPassword"
            name="oldPassword"
            placeholder="Enter oldpassword"
            type="password"
            autoFocus="autoFocus"
            onChange={e => handleFieldChange(e)}
            value={fields.oldPassword}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required="required"
            fullWidth="fullWidth"
            name="password"
            label="NewPassword"
            type="password"
            placeholder="Enter newpassword"
            id="password"
            onChange={e => handleFieldChange(e)}
            value={fields.password}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required="required"
            fullWidth="fullWidth"
            name="confirmPassword"
            label="ConfirmPassword"
            type="password"
            placeholder="Enter newpassword"
            id="confirmPassword"
            onChange={e => handleFieldChange(e)}
            value={fields.confirmPassword}
          />

          <Button
            type="submit"
            fullWidth="fullWidth"
            variant="contained"
            color="primary"
            className={classes.setFields}
            onClick={handleClickOpen}
          >
            Change Password
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
             Password Successfully updated
            </DialogTitle>
          
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Done
              </Button>
             
            </DialogActions>
          </Dialog>
        </form>
      </div>
    </Card>
  </div>
);
  
}

