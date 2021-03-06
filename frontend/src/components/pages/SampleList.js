import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Chip from '@material-ui/core/Chip';
import MaterialTable,{MTableToolbar} from 'material-table';
import ReadMoreAndLess from 'react-read-more-less';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Sample, SampleData} from '../../apiCalls'
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
  const sidebar = useSelector(state => state.sidebar);
  const [isDeleted, setDeleted] = useState(false);
  const [data] = useFetch(SampleData, isDeleted, props);
  const classes = useToolbarStyles();

  const handleDescription = (description) => {
    if(description!=null) {
    return (<ReadMoreAndLess className="read-more-content" charLimit={125} readMoreText="...read more" readLessText="...read less">
      {description}
    </ReadMoreAndLess>);}
  }

  const handleDescriptors = (descriptors) => {
    return( descriptors.map((row,index ) => {
     let ret = `${row["sampleDescriptor"]["name"]} :\xa0\xa0 ${row["value"]} \xa0\xa0  ${row["unitOfMeasurement"]}`
    return(

      <Chip
        size="small"
        variant="outlined"
        label={ret}
        color ="primary"
        className = {classes.chip}
      />
  )
}))
  }

  const handleAddNewSample = () => {
    props.prop.history.push("/addsample")
  }

  const headCells = [
    {
      field: 'name',
      title: 'Sample Name'
    }, {
      field: 'sample_type_name',
      title: 'Sample Type'
    }, {
      field: 'sampleDescriptors',
      title: 'Sample Descriptors',
      sorting: false,
      searchable: false,
      render: rowData => handleDescriptors(rowData.sampleDescriptors)
    },{
      field: 'description',
      title: 'Sample Description',
      sorting: false,
      searchable: false,
      render: rowData => handleDescription(rowData.description)
    }

  ];

  return (<div className = {sidebar ? classes.root1 : classes.paper}>

     <div>
      <Helmet>
        <title>{head.samplelist.title}</title>
        {getMeta(head.samplelist)}
      </Helmet>
        </div>

    <MaterialTable
      title="Sample List"
      columns={headCells}
      data={data}
      actions={[
        {
          icon: "edit",
          tooltip: "Edit Sample",
          onClick: (event, rowData) => {
            props.prop.history.push(`/editsample/${rowData.sampleId}`);
          }
        }
      ]}
      editable={{
        onRowDelete: oldData =>
          new Promise(resolve => {
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
           <MTableToolbar classes={{ root: classes.root }} {...props} />
            <div style={{ display: "flex", marginLeft: "20px" }}>
              <Button color="primary" variant="contained" onClick={handleAddNewSample}>
                Add New Sample
              </Button>
            </div>
          </Paper>
        )
      }}
    />
    </div>
  );
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
  },
  chip : {
    marginRight : theme.spacing(1),
    marginBottom : theme.spacing(1)
  }
}));
