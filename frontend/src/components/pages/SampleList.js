import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import MaterialTable,{MTableToolbar} from 'material-table';
import ReadMoreAndLess from 'react-read-more-less';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Sample, SampleData} from '../../apiCalls'


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
  fetch(`${Sample}/${id}`, {
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
  const [data] = useFetch(SampleData, isDeleted, props);
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

  const handleAddNewSample = () => {
    console.log(props)
    props.prop.history.push("/addsample")
  }

  const headCells = [
    {
      field: 'name',
      title: 'Sample Name'
    }, {
      field: 'sampleTypeName',
      title: 'Sample Type Name'
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

  return (<MaterialTable title="Sample List" columns={headCells} data={data}
  actions={[
    {
      icon: 'edit',
      tooltip: 'Edit Sample',
      onClick: (event, rowData) => {
        props.prop.history.push(`/editsample/${rowData.sampleId}`);
      }
    }
  ]}
  editable={{
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
        <Paper>
         <MTableToolbar  classes = {{ root: classes.root}} {...props}/>
          <div style={{display : "flex",marginLeft : "20px"}}>
            <Button color="primary" onClick={handleAddNewSample}>Add New Sample</Button>

          </div>
        </Paper>)}}
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
