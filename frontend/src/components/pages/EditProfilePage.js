import React, {useEffect, useReducer, useState} from 'react';
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
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import Grid from '@material-ui/core/Grid';


export default function EditProfilePage(props) {
  const classes = useToolbarStyles();
  const history = useHistory();
  let serverError = false;
  const [errors, setErrors] = useState('');

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
      const regExMapping ={
        "username":RegExp(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/),
        "name":RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{0,64}$/),
        "email":RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i),
        "url":RegExp(/^([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/),
        "contact" : RegExp(/^((\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}){0,32}$/),
        "department" : RegExp(/^[a-zA-Z0-9!@ #\$%\^\&*\)\(+=._-]{0,64}$/),
        "affiliation" : RegExp(/^[a-zA-Z0-9!@ #\$%\^\&*\)\(+=._-]{0,64}$/),
        "providerGroup" : RegExp(/^[a-zA-Z0-9!@ #\$%\^\&*\)\(+=._-]{0,64}$/),

      };
      const name = e.target.name;
      const newValue = e.target.value;
      if(newValue.match(regExMapping[name])) {
        setProviderData({ [name]: newValue });
        setErrors({...errors,[name]: false})}
      else {
        setProviderData({ [name]: newValue });
        setErrors({...errors,[name]: true})
      }
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
    serverError = false;
    const errorList = Object.values(errors);
    for(let i =0;i<errorList.length; i++ ){
        if(errorList[i])
        return
    }
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
     }).then(checkStatus).then(res => {
       if(serverError){
         setErrors({"Server Error" : res.message});
       } else {history.push("/dashboard")}}
   ).catch(error => console.log(error))

}
const checkStatus = res => {
  if(res.ok) {
    return res.text()
  } else {
    serverError = true;
    return res.json()
  }
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
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          { errors["serverError"] ?
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
                {errors["serverError"]}<strong> Check it out!</strong>
            </Alert>
              :
              ""
              }
          <Grid container spacing={3}>
            <div className = {classes.fieldAlign}>
              <Grid item xs={6}>
              <TextField
                disabled
                id="username"
                label="Username"
                name="username"
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
              error={errors["name"]}
              helperText= {errors["name"]?"Enter a valid name. Length should be between 4-64":""}
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
              error={errors["contact"]}
              helperText= {errors["contact"]?"Enter a valid Contact. Format: +12 123 123 1234 or 123 123 1234 ":""}
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
              error={errors["url"]}
              helperText= {errors["url"]?"Enter a valid Url":""}
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
              error={errors["department"]}
              helperText= {errors["department"]?"Enter a valid Department. Length should be less than 64 character":""}
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
              error={errors["affiliation"]}
              helperText= {errors["affiliation"]?"Enter a valid Affiliation. Length should be less than 64 character":""}
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
              error={errors["providerGroup"]}
              helperText= {errors["providerGroup"]?"Enter a valid Provider Group. Length should be less than 64 character":""}
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
