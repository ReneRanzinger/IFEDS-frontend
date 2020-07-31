import React, {useState, useReducer} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useSelector } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import {regExMapping} from  "../../utils/regExMapping";
import {username, password} from  "../../utils/validationConstant";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';




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
  }
}));


export default function SignIn({submit}) {
const [errors, setErrors] = useState('');
const [credential , setCredential] = useReducer(
  (state, newState) => ({ ...state, ...newState }),{username : '',password : ''});
const classes = useStyles();
const serverError = useSelector(state => state.user);


const handleSubmit = (e) => {
    e.preventDefault();
    const errorList = Object.values(errors);
    for(let i =0;i<errorList.length; i++ ){
        if(errorList[i])
        return
    }
    submit({"email": credential.username,
    "password": credential.password})

  };


  const handleChange = (e) => {
    const name = e.target.name;
    const newValue = e.target.value;
    if(newValue.match(regExMapping[name])) {
      setCredential({[name]: newValue });
      setErrors({...errors,[name]: false})}
    else {
      setCredential({[name]: newValue });
      setErrors({...errors,[name]: true})
    }
  }



  return (
    <Container component="main" maxWidth="xs">

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          { (serverError && serverError.error) ?
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
                {serverError.message}<strong> Check it out!</strong>
              {localStorage.ifedsAuthJWT && localStorage.removeItem("ifedsAuthJWT")}
              {localStorage.ifedsUserPermissionLevel && localStorage.removeItem("ifedsUserPermissionLevel")}
            </Alert>
              :
              ""
              }
          <TextField
            variant="outlined"
            margin="normal"
            required="required"
            fullWidth="fullWidth"
            error = {errors["username"]}
            id="username"
            label="UserName"
            name="username"
            value={credential.username}
            placeholder="Enter username"
            autoComplete="username"
            autoFocus="autoFocus"
            onChange={e => handleChange(e)}
            helperText= {errors["username"]? username:"Enter Username"}


          />

          <TextField
            variant="outlined"
            margin="normal"
            required="required"
            fullWidth="fullWidth"
            error = {errors["password"]}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            id="password"
            value = {credential.password}
            autoComplete="current-password"
            onChange={e => handleChange(e)}
            helperText= {errors["password"]? password:"Enter Password"}

          />

          <Button
            type="submit"
            fullWidth="fullWidth"
            variant="contained"
            color="primary"
            className={classes.submit}

          >
            Sign In
          </Button>
          <Grid container="container">
            <Grid item="item" xs="xs">
              <Link to="/forgotpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
