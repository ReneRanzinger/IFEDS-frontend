import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

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
  button : {
    marginLeft : "auto"
  },
  title: {
    flexGrow: 1

  }
}));

export default function MenuAppBar({props,isDashBoard}) {
  const classes = useStyles();
  const applicationSetting = useSelector(state => state.setting);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    //props.history.push("/dashboard");
    setAnchorEl(null);
  };

  const handleLogin = () => {
    props.history.push("/login");
  };

  const handleLogout = () => {
    //  submit();
    props.logout();
    props.history.push("/");
  }
  return (<div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <div className = {classes.root1}>
        <Avatar variant= "square" className = {classes.image} alt="Database Logo" src={applicationSetting[1] ? applicationSetting[1].value : null} />
        <Typography variant="h6" className = {classes.logo}>
          <Link to="/">{applicationSetting[0] ? applicationSetting[0].value : null}</Link>
        </Typography>

      </div>
      <div className = {classes.button}>
        {
          props.isAuthenticated && (<div>
            <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
              <AccountCircle/>
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }} keepMounted="keepMounted" transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>DashBoard</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>)
        }
        {
          !props.isAuthenticated && (<Button onClick={handleLogin} color="inherit">
            Login
          </Button>)
        }
      </div>
      </Toolbar>
    </AppBar>
  </div>);
}
