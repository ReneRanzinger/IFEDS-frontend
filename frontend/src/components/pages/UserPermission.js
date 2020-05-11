import React, {useState, useReducer, useEffect} from 'react';
import {useSelector} from 'react-redux';
import MaterialTable from 'material-table';
import {makeStyles} from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import {Permission} from '../../apiCalls';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";

const UserPermission = (props) => {
  const [usersDetails, setUsersDetails] = useState([]);
  //const [disable, setDisable] = useReducer((state, newState) => ({ ...state, ...newState }),false);
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
  }).then(response => response.json()).then(res => {
    setChanged(!changed);
    setUsersDetails(null)
  }).catch(error => console.log(error));

 }


  const headCells = [
    {
      field: 'username',
      title: 'User Name'
    },
    {
      field: 'email',
      title: 'Email',
      sorting: false,
      searchable: false
      //render: rowData => handleDescription(rowData.description)
    },
    {
      field: 'permission_level',
      title: 'Permission Level',
      sorting: false,
      searchable: false,
      render: rowData => handlePermission(rowData.permission_level)
    }, {
      title: 'Active User',
      sorting: false,
      searchable: false,
      render: rowData => handleActiveUser(rowData.active)
    }
  ];


  return (<div className = {sidebar ? classes.root1 : classes.root}><MaterialTable
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
          /> : <Switch
            checked={false}
            onChange={event => handleAdmin(event,rowData,'promote')}
            name="Promote"
            color="primary"
            size="small"
            label="Promote"
          /> )}


        }),
        rowData => ({

          icon: () => {return (rowData.active  ? <Switch
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
          /> )}
        //  tooltip: 'Promote to Admin',
        //  onClick: (event, rowData) => handleAdmin(event,rowData,rowData.permission_level === "admin" ? 'demote':'promote')


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
