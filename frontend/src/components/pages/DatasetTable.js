import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import MaterialTable, {MTableToolbar} from 'material-table';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import ReadMoreAndLess from 'react-read-more-less';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import {ProviderDataset, Datasets} from '../../apiCalls'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Helmet } from "react-helmet";
import { head } from "./head.js";
import { getMeta } from "./head.js";



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
  fetch(`${Datasets}/${id}`, {
    method: "DELETE",
    mode: 'cors',
    headers: setAuthorizationHeader(isAuthenticated)
  }).then(response => response.json()).then(res => {
    if (res.status === 401) {
      props.props.logout();
    }}).catch(error => {
    console.log(error)
  });
}

export default function DatasetTable(props) {
  const isAuthenticated = useSelector(state => state.user.token);
  const sidebar = useSelector(state => state.sidebar);
  const [isDeleted, setDeleted] = useState(false);
  const [data] = useFetch(ProviderDataset, isDeleted, props);
  const classes = useToolbarStyles();

  const handleDescription = (description) => {
    return (<ReadMoreAndLess className="read-more-content" charLimit={125} readMoreText="   read more" readLessText="   ...read less">
      {description}
    </ReadMoreAndLess>

    );
  }

  const handleDatasetName = (id, name) => {
    return (<Link to={`/datasetDetail/${id}`}>{name}
    </Link>);
  }

  const handleAddNewDataset = () => {
    props.prop.history.push("/adddataset")
  }

  const headCells = [
    {
      field: 'datasetName',
      title: 'Dataset Name',
      render: rowData => handleDatasetName(rowData.datasetId, rowData.datasetName)
    }, {
      field: 'num_of_files',
      title: 'Number of files'
    }, {
      field: 'sampleName',
      title: 'Sample Name'
    }, {
      field: 'description',
      title: 'Dataset Description',
      sorting: false,
      searchable: false,
      render: rowData => handleDescription(rowData.description)
    }
  ];

  return (<div className = {sidebar ? classes.root1 : classes.paper}>
        <div>
      <Helmet>
        <title>{head.datasettable.title}</title>
        {getMeta(head.datasettable)}
      </Helmet>
        </div>
  <MaterialTable title="Dataset Table" columns={headCells} data={data}
  actions={[
    {
      icon: () => {return<NoteAddOutlinedIcon/>},
      tooltip: 'Add File',
      onClick: (event, rowData) => {
        console.log(props);
        props.prop.history.push(`/adddatasetfile/${rowData.datasetId}`);
      }
    },
    {
      icon: 'edit',
      tooltip: 'Edit Dataset',
      onClick: (event, rowData) => {
        props.prop.history.push(`/editdataset/${rowData.datasetId}`);
      }
    }
  ]}

  editable={{

      onRowDelete: oldData => new Promise(resolve => {
        setTimeout(() => {
          resolve();
          fetchDelete(oldData.datasetId, isAuthenticated, props);
          setDeleted(!isDeleted);
        }, 300);
      })
    }}

    components={{
      Toolbar: props => (
        <Paper>
         <MTableToolbar classes={{ root: classes.root }} {...props} />
          <div style={{ display: "flex", marginLeft: "20px" }}>
            <Button color="primary" variant="contained" onClick={handleAddNewDataset}>
              Add New Dataset
            </Button>
          </div>
        </Paper>
      )
    }}
  />
    </div>);
}

const drawerWidth = 240;

const useToolbarStyles = makeStyles(theme => ({
  root: {
    flex: 1

  },
  root1: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginTop: theme.spacing(2),
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  paper: {
    marginTop: theme.spacing(2),
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
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
