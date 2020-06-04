import React, {useReducer} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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
      //margin: theme.spacing(3, 0, 2),
      marginTop:5
    
    },
    message:{

      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(10)
    }
  }));
export default function UserCreated() {

    const formclasses = useStyles();
    const history = useHistory();

  const isAuthenticated = useSelector(state => state.user.token);
  const sidebar = useSelector(state => state.sidebar);

  const handleClick = (e , url) => {
      history.push(url)
  }

  const classes = useToolbarStyles();
  return (<div className = {sidebar ? classes.root1 : classes.paper}>

<React.Fragment>
        <CssBaseline />
        <main className={formclasses.layout}>
        <Paper className={formclasses.paper}>
          <Typography className={formclasses.message} component="h4" variant="h4" align="center">
            User Created Successfully
          </Typography>
          <Grid container spacing={3}>  
        <br></br>
        <Grid item xs={12}>
        <Button
            variant="contained"
            color="primary"
            className={formclasses.submit}
            onClick={e => handleClick(e,"../createuser")}
            fullWidth
        >
            Create New User
        </Button>
        </Grid>
        <Grid item xs={12}>
        <Button 
            type="submit"
            variant="contained"
            color="primary"
            className={formclasses.submit}
            onClick={e => handleClick(e,"../dashboard")}
            fullWidth
        >
            Back to Home
        </Button>

        </Grid>
        
        
          
      </Grid>
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
  },
  submit:{
    marginTop: theme.spacing(3)
  }
}));


 