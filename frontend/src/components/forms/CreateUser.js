import React, {useState, useEffect, useReducer} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import ReadMoreAndLess from 'react-read-more-less';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {CreateUserAPI} from '../../apiCalls'

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
      layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
      },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));
export default function CreateUser({submit}) {

    const formclasses = useStyles();
    const [data, setData] = useReducer(
      (state, newState) => ({ ...state, ...newState }),{
        username : "",
        password: "",
        email: "",
        department:"",
        name:"",
        providerGroup:"",
        providerId:"",
        affiliation:"",
        url:""


       })

    const handleSubmit = (e) => {
      console.log("data",data)
      e.preventDefault();
      fetch(CreateUserAPI, {
        method: "POST",
        mode: 'cors',
        headers: setAuthorizationHeader(isAuthenticated),
        body: JSON.stringify({
          "name": data.name,
          "username": data.username,
          "email": data.email,
          "department": data.department,
          "providerId": data.providerId,
          "providerGroup": data.providerGroup,
          "url": data.url,
          "password": data.password,
          "affiliation": data.affiliation 
     })
       
      }).then(response => response.json()).then(res => {
        
        console.log("success")
      }).catch(error => console.log(error));
    }

  const isAuthenticated = useSelector(state => state.user.token);
  const sidebar = useSelector(state => state.sidebar);

  const classes = useToolbarStyles();

 

  const handleDescription = (description) => {
    if(description!=null) {
    return (<ReadMoreAndLess className="read-more-content" charLimit={125} readMoreText="...read more" readLessText="...read less">
      {description}
    </ReadMoreAndLess>);}
  }

  const handleUrl = (url) => {
    return (<Link to={url}>
      {url}
    </Link>);
  }

  const handleChange = e => {
    const name = e.target.name;
    const newValue = e.target.value;
    setData({[name]: newValue});
  }
  

  

  return (<div className = {sidebar ? classes.root1 : classes.paper}>

<React.Fragment>
        <CssBaseline />

        <main className={formclasses.layout}>
        <Paper className={formclasses.paper}>
          <Typography component="h1" variant="h4" align="center">
            Create User
          </Typography>
          <form onSubmit = {handleSubmit}>
          <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            onChange={e => handleChange(e)}
            autoComplete="name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          required
             id="username"
             label="Username"
             name="username"
             autoComplete="username"
             autoFocus="autoFocus"
             onChange={e => handleChange(e)}
             autoComplete="username"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          required
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={e => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
           required
           id="Email"
           name="email"
           label="Email"
           onChange={e => handleChange(e)}
           autoComplete="Email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Department"
            name="department"
            label="Department"
            onChange={e => handleChange(e)}
            autoComplete="Department"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Provider Group"
            name="providerGroup"
            label="Provider Group"
            onChange={e => handleChange(e)}
            autoComplete="Provider Group"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="Provider ID" name="providerId" label="Provider ID" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Url"
            name="url"
            label="Url"
            onChange={e => handleChange(e)}
            autoComplete="Url"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Affiliation"
            name="affiliation"
            label="Affiliation"
            fullWidth
            autoComplete="Affiliation"
            onChange={e => handleChange(e)}
          />
        </Grid>
        <br></br>
        <div>&nbsp;</div>
        <Button
            type="submit"
            fullWidth="fullWidth"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create User
          </Button>
          
      </Grid>
      </form>
      </Paper>
    </main>
    </React.Fragment>
    
   
    
    </div>
  );
}

const drawerWidth = 240;

const useToolbarStyles = makeStyles(theme => ({
  root: {
    flex: 1

  },
  root1: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginTop: theme.spacing(2),
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  paper: {
    marginTop: theme.spacing(2),
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  spacer: {
    flex:1
  },
  spacer1: {
    flexGrow: 2,
    marginRight: theme.spacing(2)}
  ,
  textField: {
    marginRight: theme.spacing(1),
    width: 200,
  },
  menu: {
    width: 200,
  }
}));


 