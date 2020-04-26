import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Card from "@material-ui/core/Card";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import {Provider, Dashboard} from '../../apiCalls'


const useFetch = (url) => {
  const isAuthenticated = useSelector(state => state.user.token);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      mode: 'cors',
      headers: setAuthorizationHeader(isAuthenticated)
    }).then(response => response.json()).then(res => {
      setData(res);
    }).catch(error => console.log(error));
  }, [isAuthenticated, url]);
  return [data, setData];
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    width: '97%',
    marginLeft: theme.spacing(2),
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  root1: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  submain: {
    width : '30%',
    marginLeft: theme.spacing(2)
  },
  bullet1: {
    width : "30%",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  media : {
    height : 140
  },
  edit : {
    display: 'flex',
    justifyContent: 'space-between'
  },
  header: {
    color: "green",
    marginBottom: theme.spacing(0),
    marginLeft: theme.spacing(2),
    paddingTop: theme.spacing(2)
  },
  header1: {
    color: "green",
    marginBottom: theme.spacing(0),
    paddingTop: theme.spacing(2)
  },
  heading: {
    color: "#5bc0be",
    marginBottom: theme.spacing(0)
  },
  detail : {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(2)
  },
  content: {
    textAlign : "center"
  },
  divider: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

const ProviderDetail = (props) => {
  const {provider , classes} = props;

  const handleClick = e => {
    // TODO: This link needs to point to Edit Profile Page
      props.history.push("/profile")
  }

  return(<Card className = {classes.bullet1}>
    <div className = {classes.edit}>
      <Typography variant = "h6" className = {classes.header1}>Provider</Typography>
        <Tooltip title = "Edit" onClick={handleClick} >
          <IconButton aria-label="Edit" >
            <EditIcon/>
          </IconButton>
        </Tooltip>
    </div>
    <Divider />
    <Typography variant = "subtitle2" className = {classes.heading}>Name</Typography>
    <Typography variant = "subtitle2" className = {classes.detail}>{provider.name}</Typography>
    { provider.providerGroup && <div>
      <Typography variant = "subtitle2" className = {classes.heading}>Group</Typography>
      <Typography variant = "subtitle2" className = {classes.detail}>{provider.providerGroup}</Typography>
      </div>
    }
    { provider.department && <div>
      <Typography variant = "subtitle2" className = {classes.heading}>Department</Typography>
      <Typography variant = "subtitle2" className = {classes.detail}>{provider.department}</Typography>
      </div>
    }
    { provider.affiliation && <div>
      <Typography variant = "subtitle2" className = {classes.heading}>Affiliation</Typography>
      <Typography variant = "subtitle2" className = {classes.detail}>{provider.affiliation}</Typography>
      </div>
    }
    { provider.url && <div>
      <Typography variant = "subtitle2" className = {classes.heading}>URL</Typography>
      <Typography variant = "subtitle2" className = {classes.detail}>{provider.url}</Typography>
      </div>
    }
    { provider.contact && <div>
      <Typography variant = "subtitle2" className = {classes.heading}>Contact</Typography>
      <Typography variant = "subtitle2" className = {classes.detail}>{provider.contact}</Typography>
      </div>
    }
    { provider.username && <div>
      <Typography variant = "subtitle2" className = {classes.heading}>Username</Typography>
      <Typography variant = "subtitle2" className = {classes.detail}>{provider.username}</Typography>
      </div>
    }
    { provider.email && <div>
      <Typography variant = "subtitle2" className = {classes.heading}>Email</Typography>
      <Typography variant = "subtitle2" className = {classes.detail}>{provider.email}</Typography>
      </div>
    }

  </Card>)
}

const CardDataDisplay = (props) => {
  const {classes, title} = props;

  const handleClick = e => {
    if (title === 'Datasets') {
      props.history.push("/datasettable")
    } else {
      props.history.push('/samplelist')
    }
  }

  return (
    <Card className={classes.submain} onClick = {handleClick}>
      <CardActionArea>
        <Typography variant = "h6" className = {classes.header}>{title}</Typography>
        <Divider className = {classes.divider}/>
        <CardContent className = {classes.content}>
          <Typography variant="h1" component="h2" color="primary">
            {props.number}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}


export default function DashboardDetail(props) {
  const classes = useStyles();
  const [provider] = useFetch(Provider);
  const [dashboard] = useFetch(Dashboard);
  const sidebar = useSelector(state => state.sidebar);

  return(<div className = {sidebar ? classes.root1 : classes.root}>

    <div style = {{display : "flex", justifyContext : "space-around", marginTop : "70px"}}>
     <CardDataDisplay
       {...props}
       classes = {classes}
       title = "Datasets"
       number = {dashboard.num_of_dataset}/>
     <CardDataDisplay
       {...props}
       classes = {classes}
       title = "Samples"
       number = {dashboard.num_of_samples}/>
     </div>
         <ProviderDetail
           {...props}
            classes = {classes}
            provider = {provider}/>
  </div>)
 }
