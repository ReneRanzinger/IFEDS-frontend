import React, {useState, useReducer, useEffect} from 'react';
import {useSelector} from 'react-redux';
import MaterialTable from 'material-table';
import {makeStyles} from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import {Permission} from '../../apiCalls';
import Tooltip from '@material-ui/core/Tooltip';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";

const UserPermission = (props) => {
  const [usersDetails, setUsersDetails] = useState([]);
  const [changed, setChanged] = useReducer((state, newState) => ({ ...state, ...newState }),false);
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
  }, [isAuthenticated], changed);

  const handlePermission = (permission_level) => {

    return(<div className = {classes.check}>
      { permission_level === "admin" &&
      <CheckIcon color = "primary"/>}
    </div>)
  }

  const handleActiveUser = (permission_level) => {

    return(<div className = {classes.check}>
      { permission_level === "active" &&
      <CheckIcon color = "primary"/>}
    </div>)
  }

 const handleAdmin = (e,data,action) => {
  e.preventDefault()
  //console.log(data)

  fetch(`${Permission}/${action}/${data.provider_id}`, {
    method: "PUT",
    mode: 'cors',
    headers: setAuthorizationHeader(isAuthenticated)
  }).then(response => response.json()).then(res => {
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
      render: rowData => handleActiveUser(rowData.permission_level)
    }
  ];


  return (<div className = {sidebar ? classes.root1 : classes.root}><MaterialTable
    title="User Permission"
    columns={headCells}
    data={usersDetails}
    actions={[
      {
        icon: () => {return<ThumbUpAltIcon color="primary"/>},
        tooltip: 'Promote to Admin',
        onClick: (event, rowData) => {
          //props.prop.history.push(`/adddatasetfile/${rowData.datasetId}`);
        }


    }
    ]}
    options={{
       actionsColumnIndex: -1
     }}
     components={{
       Action: props => (
         <div>
           {console.log("anu", props)}

           {props.data && props.data.permission_level === "admin" ?
            <Tooltip title="Demote Admin">
             <ThumbDownIcon color="primary" onClick={e => handleAdmin(e, props.data,"demote")}/>
             </Tooltip > :
             <Tooltip title="Promote to Admin" >
               <ThumbUpAltIcon color = "primary" onClick={e => handleAdmin(e, props.data,"promote")}/>
             </Tooltip>}

         </div>
       )
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
