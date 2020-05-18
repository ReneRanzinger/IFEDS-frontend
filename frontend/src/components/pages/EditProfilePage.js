import React, {useEffect, useReducer} from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom'
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Provider, UpdateProvider} from '../../apiCalls'
import { Helmet } from "react-helmet";
import { head } from "../pages/head.js";
import { getMeta } from "../pages/head.js";

import Grid from '@material-ui/core/Grid';


export default function EditProfilePage(props) {
  const classes = useToolbarStyles();
  const history = useHistory();

  const [providerData, setProviderData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      affiliation: "",
      contact: "",
      department: "",
      email: "",
      name: "",
      providerGroup: "",
      url: "",
      username: ""
    }
  );

  const handleChange = e => {
      const name = e.target.name;
      const newValue = e.target.value;
      setProviderData({ [name]: newValue });
    };

  const isAuthenticated = useSelector(state => state.user.token);
  const sidebar = useSelector(state => state.sidebar);

  const handleClose = () => {
    history.push("/dashboard");

  }

  useEffect(() => {
    fetch(Provider, {
      method: "GET",
      mode: 'cors',
      headers: setAuthorizationHeader(isAuthenticated)
    }).then(response => response.json()).then(res =>
      setProviderData(res)
      ).catch(error => console.log(error));
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(UpdateProvider,{
       method: "PUT",
       headers: setAuthorizationHeader(isAuthenticated),
       body: JSON.stringify({
         "affiliation": providerData["affiliation"],
        "contact": providerData["contact"],
        "department": providerData["department"],
        "email": providerData["email"],
        "name": providerData["name"],
        "providerGroup": providerData["providerGroup"],
        "url": providerData["url"],
        "username": providerData["username"]
       })
     }).then(res => history.push("/dashboard")
   ).catch(error => console.log(error))

}



  return (
    <div>
      <div>
        <Helmet>
          <title>{head.editsampleform.title}</title>
          {getMeta(head.editsampleform)}
        </Helmet>
      </div>
      <Paper className={sidebar ? classes.root1 : classes.root}>
        <div className = {classes.header}><Typography variant="h5" component="h3">
          Edit Profile
        </Typography>
      </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <div className = {classes.fieldAlign}>
              <Grid item xs={6}>
              <TextField
                disabled
                id="username"
                label="Username"
                name="name"
                size="small"
                value={providerData.username}
                defaultValue={providerData.username}
                onChange={handleChange}
                className={classes.textField2}
                type="text"
              />
          </Grid>
          <Grid item xs={6}>
              <TextField
                margin="dense"
                disabled
                className={classes.textField2}
                size="medium"
                id="email"
                name="email"
                value={providerData.email}
                defaultValue={providerData.email}
                onChange={handleChange}
                label="Email"
                type="email"
              />
          </Grid>
          </div>
          <div className = {classes.fieldAlign}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              className={classes.textField2}
              size="medium"
              id="name"
              name="name"
              value={providerData.name}
              defaultValue={providerData.name}
              onChange={handleChange}
              label="Name"
              type="text"
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
              margin="dense"
              className={classes.textField2}
              size="medium"
              id="contact"
              name="contact"
              value={providerData.contact}
              defaultValue={providerData.contact}
              onChange={handleChange}
              label="Contact"
              type="text"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            />
        </Grid>
      </div>
      <div className = {classes.fieldAlign}>
      <Grid item xs={12}>
            <TextField
              margin="dense"
              className={classes.textField1}
              size="medium"
              id="url"
              name="url"
              value={providerData.url}
              defaultValue={providerData.url}
              onChange={handleChange}
              fullWidth
              label="Url"
              type="url"
            />
        </Grid>
      </div>

            <TextField
              margin="dense"
              className={classes.textField1}
              size="medium"
              id="department"
              name="department"
              value={providerData.department}
              defaultValue={providerData.department}
              onChange={handleChange}
              label="Department"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              className={classes.textField1}
              size="medium"
              id="affiliation"
              name="affiliation"
              value={providerData.affiliation}
              defaultValue={providerData.affiliation}
              onChange={handleChange}
              label="Affiliation"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              className={classes.textField1}
              size="medium"
              id="providerGroup"
              name="providerGroup"
              value={providerData.providerGroup}
              defaultValue={providerData.providerGroup}
              onChange={handleChange}
              label="Provider Group"
              type="text"
              fullWidth
            />


</Grid>

          <div style={{ marginTop: "40px" }}>
            <Button
              style={{ marginRight: "20px" }}
              onClick={handleClose}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>

        </form>
      </Paper>
    </div>
  );
}

const drawerWidth = 240;

  const useToolbarStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      marginTop: theme.spacing(2),
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    root1: {
      padding: theme.spacing(3, 2),
      marginTop: theme.spacing(2),
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    fieldAlign : {
      display : "contents"
    },
    form : {
      marginLeft: theme.spacing(2),
    },
    header : {
      margin: theme.spacing(2)
    },
    textField1 :{
      marginTop: theme.spacing(2.3),
      width: "75%"
    },
    textField2 :{
      marginTop: theme.spacing(2.3),
      width : "50%"
    },
    nameField :{
      marginTop: theme.spacing(2.3)
    },
    valueField: {
      marginTop:theme.spacing(2.3),
      marginRight: theme.spacing(11)
    },
    formDiv : {
      marginTop: theme.spacing(2)
    },
    label: {
      marginLeft: theme.spacing(3),
      paddingTop: theme.spacing(5)
    },
    menu: {
      width: 200,
    }
  }));
