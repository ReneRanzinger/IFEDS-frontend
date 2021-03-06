import React, { useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import {ForgotPassword} from "../../apiCalls";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { head } from "./head.js";
import { getMeta } from "./head.js";

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




export default function ChangePassword(props) {
  const isAuthenticated = useSelector(state => state.user.token);
  const history = useHistory();
  const classes = useStyles();
  const { match: { params } } = props;
  const sidebar = useSelector(state => state.sidebar);
  const [isChanging, setIsChanging] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = useState("");
  const [fields, setFields] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      password: "",
      confirmPassword: ""
    }
  );

  const handleFieldChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setFields({ [name]: value });
  };

  const handleClose = () => {
    history.push("/login");
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleChangeClick = event => {
    event.preventDefault();
    setIsChanging(true);
    console.log(params.token)
    fetch(`${ForgotPassword}/${params.token}`, {
      method: "POST",
      mode: "cors",
      headers: setAuthorizationHeader(isAuthenticated),
      body: JSON.stringify({
        new_password: fields.password,
        confNew_password: fields.confirmPassword
      })
    })
      .then(res => {
        history.push("/login");
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <div>
        <Helmet>
          <title>{head.password_reset.title}</title>
          {getMeta(head.password_reset)}
        </Helmet>
      </div>
      <Navbar props={props} />
      <Card className={classes.bullet1}>
        <div className="ChangePassword">
          <form className={classes.form} onSubmit={e => handleChangeClick(e)}>
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
                Password Successfully changed
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
