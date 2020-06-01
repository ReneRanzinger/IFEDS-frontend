 import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import { AvForm, AvGroup, AvInput, AvFeedback } from "availity-reactstrap-validation";
import FPasswordLink from "../pages/FPasswordLink";
import { Link } from "react-router-dom";




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
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
 const classes = useStyles();

 

const handleSubmit = (e) => {
    e.preventDefault();
    
    submit({email: username, password: password});

  }
//   const validate = (values) => {
//   const errors = {};
//   const requiredFields = ["username", "password"];
//   requiredFields.forEach(field => {
//     if (!values[field]) {
//       errors[field] = "Required";
//     }
//   });
//   return errors;
// };

const validate = (values) =>{
const errors = [];

  if (username.length === 0) {
    errors.push("Name can't be empty");
  }

 if (password.length < 6) {
    errors.push("Password should be at least 6 characters long");
  }

  return errors;
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

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required="required"
            fullWidth="fullWidth"
            id="username"
            label="UserName"
            name="username"
            placeholder="Enter username"
            autoComplete="username"
            autoFocus="autoFocus"
            onChange={e => setUsername(e.target.value)}
            helpertext="Enter Password"
           
          />

          <TextField
            variant="outlined"
            margin="normal"
            required="required"
            fullWidth="fullWidth"
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            helpertext="Enter Password"
           
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

