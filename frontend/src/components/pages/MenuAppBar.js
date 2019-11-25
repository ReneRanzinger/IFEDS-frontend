import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Sidebar from './Sidebar';

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

export default function MenuAppBar({props, submit, isDashBoard}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
  }
  return (<div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          {isDashBoard &&< Sidebar />}
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <Link to="/">IFEDS</Link>
        </Typography>
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>)
        }
        {
          !props.isAuthenticated && (<Button onClick={handleLogin} color="inherit">
            Login
          </Button>)
        }
      </Toolbar>
    </AppBar>
  </div>);
}