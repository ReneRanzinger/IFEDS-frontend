import React from "react";
import clsx from "clsx";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import StarBorder from '@material-ui/icons/StarBorder';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },

  root1: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },

  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },

  toolbarButtons: {
    marginLeft: "auto"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

export default function PersistentDrawerLeft({props}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [open2, setOpen1] = React.useState(false);
  const [open3, setOpen2] = React.useState(false);


   const handleMenu = event => {
     setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
     //props.history.push("/dashboard");
     setAnchorEl(null);
   };

   const handleLogin = () => {
     //    console.log(props);
     props.history.push("/login");
   };

   const handleLogout = () => {
     //  submit();
     props.logout();
     props.history.push("/");
   };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDataClick = ()=>{
    setOpen1(!open2);
  };

  const handleAdminClick = () => {
    setOpen2(!open3);
  };
  
  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            <Link to="/">IFEDS</Link>
          </Typography>
          {props.isAuthenticated && (
            <div style={{ justifyContent: "flex-end", marginLeft: "auto" }}>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted="keepMounted"
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open1}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}>DashBoard</MenuItem> */}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
          {!props.isAuthenticated && (
            <Button onClick={handleLogin} color="inherit" margin-inline-start= "auto">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        {/* <List>
          {[
            ["Home", "/dashboard"],
            ["Data", "/datasettable"],
            [" Sample", "/samplelist"]
          ].map((text, index) => (
            <Link to ={text[1]}>
            <ListItem button="button" key={index} component="a" Link to="text[1]">
              {text[0]}
            </ListItem>
              <ListItemText primary="Inbox" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </Link>
          ))}
        </List> */}

        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.root1}
        >
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <Link to="/dashboard"> <ListItemText primary="Home" /></Link>
          </ListItem>
          <ListItem button onClick={handleDataClick}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Data" />
            {open ? <ExpandMore /> : <ExpandLess />}
          </ListItem>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <Link to="/datasettable"> <ListItemText primary="Dataset" /></Link>
               
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                
                <Link to="/samplelist"><ListItemText primary="Samples" /></Link>
              </ListItem>
            </List>
          </Collapse>
          <List>
          <ListItem button onClick={handleAdminClick}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
            {open ? <ExpandMore /> : <ExpandLess />}
          </ListItem>
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Password" />
               
              </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  
                  <ListItemText primary="Account Settings" />
                </ListItem>
            </List>
          </Collapse>
          </List>
        </List>

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div />
        {/* <h1>WELCOME</h1> */}
      </main>
    </div>
  );




}
