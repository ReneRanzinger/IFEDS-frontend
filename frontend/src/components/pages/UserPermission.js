import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import MaterialTable from 'material-table';
import {makeStyles} from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import {Permission} from '../../apiCalls';
import Switch from '@material-ui/core/Switch';
import { Helmet } from "react-helmet";
import { head } from "./head.js";
import { getMeta } from "./head.js";
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";

const UserPermission = (props) => {
  const [usersDetails, setUsersDetails] = useState([]);
  const [changed, setChanged] = useState(false)
  const isAuthenticated = useSelector(state => state.user.token);
  const sidebar = useSelector(state => state.sidebar);
  const classes = useToolbarStyles();

  useEffect(() => {
    fetch(Permission, {
      method: "GET",
      mode: 'cors',
      headers: setAuthorizationHeader(isAuthenticated)
    }).then(response => response.json()).then(res => {
      setUsersDetails(res);
    }).catch(error => console.log(error));
  },[isAuthenticated,changed]);

  const handlePermission = (permission_level) => {

    return(<div className = {classes.check}>
      { permission_level === "admin" &&
      <CheckIcon color = "primary"/>}
    </div>)
  }

  const handleActiveUser = (active) => {
    return(<div className = {classes.check}>
      { active &&
      <CheckIcon color = "primary"/>}
    </div>)
  }

 const handleAdmin = (e,data,action) => {
  fetch(`${Permission}/${action}/${data.provider_id}`, {
    method: "PUT",
    mode: 'cors',
    headers: setAuthorizationHeader(isAuthenticated)
  }).then(response => {
    setChanged(!changed);
  }).catch(error => console.log(error));

 }


  const headCells = [
    {
      field: 'username',
      title: 'User Name'
    },
    {
      field: 'email',
      title: 'Email'
    },
    {
      field: 'permission_level',
      title: 'Permission Level',
      searchable: false,
      customSort: (a,b) => a.permission_level.length - b.permission_level.length,
      render: rowData => handlePermission(rowData.permission_level)
    }, {
      title: 'Active User',
      searchable: false,
      customSort: (a,b) => a.active - b.active,
      render: rowData => handleActiveUser(rowData.active)
    }
  ];


  return (<div className = {sidebar ? classes.root1 : classes.root}>
    <div>
     <Helmet>
       <title>{head.userpermission.title}</title>
       {getMeta(head.userpermission)}
     </Helmet>
       </div>
       <MaterialTable
    title="User Permission"
    columns={headCells}
    data={usersDetails}
    actions={[

        rowData => ({

          icon: () => {return (rowData.permission_level === "admin" ? <Switch
            checked={true}
            onChange={event => handleAdmin(event,rowData,'demote')}
            name="Demote"
            color="primary"
            size="small"
            label="Demote"
          /> : (rowData.active ? <Switch
            checked={false}
            onChange={event => handleAdmin(event,rowData,'promote')}
            name="Promote"
            color="primary"
            size="small"
            label="Promote"
          />:<Switch
            checked={false}
            onChange={event => handleAdmin(event,rowData,'promote')}
            disabled
            name="Promote"
            color="primary"
            size="small"
            label="Promote"
          /> ))},
          tooltip: rowData.active ? (rowData.permission_level === "admin" ?'Demote from Admin':'Promote to Admin') : "First Enable the user"


        }),
        rowData => ({

          icon: () => {return rowData.permission_level === "admin" ? (rowData.active  ? <Switch
            checked={true}
            onChange={event => handleAdmin(event,rowData,'disable')}
            name="disable"
            disabled
            color="primary"
            size="small"
          /> : <Switch
            checked={false}
            onChange={event => handleAdmin(event,rowData,'enable')}
            disabled
            name="enable"
            color="primary"
            size="small"
          /> ):(rowData.active  ? <Switch
            checked={true}
            onChange={event => handleAdmin(event,rowData,'disable')}
            name="disable"
            color="primary"
            size="small"
          /> : <Switch
            checked={false}
            onChange={event => handleAdmin(event,rowData,'enable')}
            name="enable"
            color="primary"
            size="small"
          /> )},
         tooltip: rowData.permission_level === "admin" ? ('To disable, demote from Admin') : (rowData.active  ? 'Disable' : 'Enable')

        })




    ]}
    options={{
       actionsColumnIndex: -1
     }}

  /></div>)
}

const drawerWidth = 240;

const useToolbarStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  root1: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    marginTop: theme.spacing(2),
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  check: {
    align : "center"
  }
  }));

export default UserPermission
