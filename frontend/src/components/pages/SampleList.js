import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import MaterialTable,{MTableToolbar} from 'material-table';
import ReadMoreAndLess from 'react-read-more-less';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import { grey } from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';


import Tooltip from '@material-ui/core/Tooltip';

const useFetch = (url, isDeleted, props) => {
  const isAuthenticated = useSelector(state => state.user.token);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      mode: 'cors',
      headers: setAuthorizationHeader(isAuthenticated)
    }).then(response => response.json()).then(res => {
      if (res.status === 401) {
        props.props.logout();
      } else {
        setData(res);
      }
    }).catch(error => console.log(error));
  }, [isAuthenticated, url, isDeleted]);
  return [data, setData];
}

const fetchDelete = (id, isAuthenticated, props) => {
  fetch(`/samples/${id}`, {
    method: "DELETE",
    mode: 'cors',
    headers: setAuthorizationHeader(isAuthenticated)
  }).then(response => response.json()).then(res => {
    if (res.status === 401) {
      props.props.logout();
    }
  }).catch(error => {
    console.log(error)
  });
}

export default function SampleList(props) {
  const isAuthenticated = useSelector(state => state.user.token);
  const [isDeleted, setDeleted] = useState(false);
  const [data] = useFetch("/getSample", isDeleted, props);
  const classes = useToolbarStyles();

  const handleDescription = (description) => {
    if(description!=null) {
    return (<ReadMoreAndLess className="read-more-content" charLimit={125} readMoreText="...read more" readLessText="...read less">
      {description}
    </ReadMoreAndLess>);}
  }

  const handleUrl = (url) => {
    return (<Link to={url}>
      {url}
    </Link>);
  }

  const headCells = [
    {
      field: 'name',
      title: 'Sample Name'
    }, {
      field: 'sample_type_id',
      title: 'Sample Type Id'
    }, {
      field: 'url',
      title: 'Url',
      render: rowData => handleUrl(rowData.url)
    }, {
      field: 'description',
      title: 'Sample Description',
      sorting: false,
      searchable: false,
      render: rowData => handleDescription(rowData.description)
    }
  ];

  return (<MaterialTable title="Sample List" columns={headCells} data={data} editable={{

      onRowUpdate: (newData, oldData) => new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 600);
      }),
      onRowDelete: oldData => new Promise(resolve => {
        setTimeout(() => {
          resolve();
          fetchDelete(oldData.sampleId, isAuthenticated, props);
          setDeleted(!isDeleted);
        }, 300);
      })
    }}

    components={{
      Toolbar: props => (
        <Paper style ={{display: 'flex'}}>
          <MTableToolbar  classes = {{ root: classes.root}} {...props}/>
            <Link to="/addsample"><Tooltip title = "Add New Sample"><Icon style={{ color: grey[600], height: "64px", padding: '16px 0px 16px 0px', margin: '0px 20px'}}
              >add_box</Icon>

          </Tooltip>

  </Link>
        </Paper>)}}
localization={{
  body: {
    editRow: {
      backgroundColor : '#f06060'

      }

  }
}}
    />


  );
}

const useToolbarStyles = makeStyles(theme => ({
  root: {
    flex: 1

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
  }
}));
