import React, {useReducer,useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {CreateUserAPI} from '../../apiCalls'
import {Link} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

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
      marginTop: 20
    }
  }));
export default function CreateUser({submit}) {
    const [errors, setErrors] = useState( '' );
    let serverError = false;
    const formclasses = useStyles();
    const history = useHistory();
    const [data, setData] = useReducer(
      (state, newState) => ({ ...state, ...newState }),{
        username : "",
        email: "",
        name:"",
        group:"",
        department:"",
        institute:"",
        url:"",
       })

    const handleSubmit = (e) => {

      serverError = false;
      const errorList = Object.values(errors);
      for(let i =0;i<errorList.length; i++ ){
          if(errorList[i])
          return
      }
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
          "group": data.group,
          "url": data.url,
          "institute": data.institute 
     })
       
      })
        .then(checkStatus)
        .then(res => {
            if(serverError){
              setErrors({"serverError" : res.message});
            } else {
              history.push("./createuser/success");
            }
        });
    }
    const checkStatus = res => {
      if(res.ok) {
        return res.text()
      } else {
        serverError = true;
        return res.json()
      }
    }
  const isAuthenticated = useSelector(state => state.user.token);
  const sidebar = useSelector(state => state.sidebar);

  const classes = useToolbarStyles();

  const handleUrl = (url) => {
    return (<Link to={url}>
      {url}
    </Link>);
  }

  const handleChange = e => {
    const regExMapping ={
      "username":RegExp(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/),
      "name":RegExp(/^(?=[a-zA-Z\s]{8,40}$)(?!.*[_.]{2})[^_.].*[^_.]$/),
      "email":RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    };
    const name = e.target.name;
    const newValue = e.target.value;
    if(newValue.match(regExMapping[name])){
      setData({[name]: newValue});
      setErrors({[name]: false});
    }
    else{
      setErrors({[name]: true});
    }
    console.log(newValue.match(regExMapping[name]));
    
    

  }
  return (<div className = {sidebar ? classes.root1 : classes.paper}>

<React.Fragment>
        <CssBaseline />

        <main className={formclasses.layout}>
        <Paper className={formclasses.paper}>
          <Typography component="h2" variant="h4" align="center">
            Create User
          </Typography>
          <form onSubmit = {handleSubmit}>
          { errors["serverError"] ?       
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
                {errors["serverError"]}<strong> Check it out!</strong>
            </Alert> 
              : 
              ""
              }
          <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            autoFocus="autoFocus"
            onChange={e => handleChange(e)}
            autoComplete="username"
            error={errors["username"]}
            helperText= {errors["username"]?"Enter a valid username":""} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          required
             id="email"
             label="Email"
             name="email"
             autoComplete="email"
             onChange={e => handleChange(e)}
             error={errors["email"]}
             helperText= {errors["email"]?"Enter a valid email":""} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          required
            id="name"
            name="name"
            label="Name"
            autoComplete="name"
            onChange={e => handleChange(e)}
            error={errors["name"]}
            helperText= {errors["name"]?"Enter a valid name":""} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
           id="group"
           name="group"
           label="Group"
           onChange={e => handleChange(e)}
           autoComplete="Group"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField  
            id="department"
            name="department"
            label="Department"
            fullWidth
            onChange={e => handleChange(e)}
            autoComplete="Department"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="institute"
            name="institute"
            label="Institute"
            fullWidth
            onChange={e => handleChange(e)}
            autoComplete="institute"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="url"
            name="url"
            label="Url"
            fullWidth
            onChange={e => handleChange(e)}
            autoComplete="Url"
          />
        </Grid>
        <br></br>
        <Button
            type="submit"
            fullWidth="fullWidth"
            variant="contained"
            color="primary"
            className={formclasses.submit}
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
  },
  submit:{
    marginTop: theme.spacing(3)
  }
}));


 