import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { logout } from "../../actions/auth";
import Sidebar from "./Sidebar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Navbar({ props, submit, isDashBoard }) {
  const classes = useStyles();
  
  
  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
            
         
          <Typography variant="h6" className={classes.title}>
            IFEDS
          </Typography>
          
            
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
