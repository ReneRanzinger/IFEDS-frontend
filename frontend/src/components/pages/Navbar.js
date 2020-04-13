import React from "react";
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  root1: {
    display : "flex"
  },
  image : {
    marginRight : theme.spacing(2)
  },
  logo : {
    marginTop : theme.spacing(0.5)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Navbar({props, submit, isDashBoard}) {
  const classes = useStyles();
  const applicationSetting = useSelector(state => state.setting);

  return (<div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <div className = {classes.root1}>
          <Avatar variant= "square" className = {classes.image} alt="Database Logo" src={applicationSetting[1] ? applicationSetting[1].value : null} />
          <Typography variant="h6" className = {classes.logo}>
            <Link to="/">{applicationSetting[0] ? applicationSetting[0].value : null}</Link>
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  </div>);
}
