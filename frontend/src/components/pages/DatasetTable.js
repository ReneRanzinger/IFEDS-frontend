<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { logout } from "../../actions/auth";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import ReadMoreAndLess from "react-read-more-less";
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";

const useFetch = (url, isDeleted) => {
  const isAuthenticated = useSelector(state => state.user.token);
  //const logout = useSelector(() => props.logout);
=======
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import MaterialTable from 'material-table';
import {Link} from 'react-router-dom';
import ReadMoreAndLess from 'react-read-more-less';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";

const useFetch = (url, isDeleted, props) => {
  const isAuthenticated = useSelector(state => state.user.token);
>>>>>>> origin/master-backup

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url, {
      method: "GET",
<<<<<<< HEAD
      mode: "cors",
      headers: setAuthorizationHeader(isAuthenticated)
    })
      .then(response => response.json())
      .then(res => {
        if (res.status === 401) {
         // props.props.logout();
        } else {
          setData(res);
        }
      })
      .catch(error => console.log(error));
  }, [isAuthenticated, url, isDeleted]);
  return [data, setData];
};
=======
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
>>>>>>> origin/master-backup

const fetchDelete = (id, isAuthenticated, props) => {
  fetch(`/datasets/${id}`, {
    method: "DELETE",
<<<<<<< HEAD
    mode: "cors",
    headers: setAuthorizationHeader(isAuthenticated)
  })
    .then(response => response.json())
    .then(res => {
      if (res.status === 401) {
        props.props.logout();
      }
    })
    .catch(error => {
      console.log(error);
    });
};
=======
    mode: 'cors',
    headers: setAuthorizationHeader(isAuthenticated)
  }).then(response => response.json()).then(res => {
    if (res.status === 401) {
      props.props.logout();
    }}).catch(error => {
    console.log(error)
  });
}
>>>>>>> origin/master-backup

export default function MaterialTableDemo(props) {
  const isAuthenticated = useSelector(state => state.user.token);
  const [isDeleted, setDeleted] = useState(false);
  const [data] = useFetch("/getProviderDatasets", isDeleted, props);

<<<<<<< HEAD
  const handleDescription = description => {
    return (
      <ReadMoreAndLess
        className="read-more-content"
        charLimit={125}
        readMoreText="...read more"
        readLessText="...read less"
      >
        {description}
      </ReadMoreAndLess>
    );
  };

  const handleDatasetName = (id, name) => {
    return <Link to={`/dataset/${id}`}>{name}</Link>;
  };

  const headCells = [
    {
      field: "datasetName",
      title: "Dataset Name",
      render: rowData =>
        handleDatasetName(rowData.datasetId, rowData.datasetName)
    },
    {
      field: "providerName",
      title: "Author"
    },
    {
      field: "sampleName",
      title: "Sample Name"
    },
    {
      field: "description",
      title: "Dataset Description",
=======
  const handleDescription = (description) => {
    return (<ReadMoreAndLess className="read-more-content" charLimit={125} readMoreText="...read more" readLessText="...read less">
      {description}
    </ReadMoreAndLess>);
  }

  const handleDatasetName = (id, name) => {
    return (<Link to={`/dataset/${id}`}>{name}
    </Link>);
  }

  const headCells = [
    {
      field: 'datasetName',
      title: 'Dataset Name',
      render: rowData => handleDatasetName(rowData.datasetId, rowData.datasetName)
    }, {
      field: 'providerName',
      title: 'Author'
    }, {
      field: 'sampleName',
      title: 'Sample Name'
    }, {
      field: 'description',
      title: 'Dataset Description',
>>>>>>> origin/master-backup
      sorting: false,
      searchable: false,
      render: rowData => handleDescription(rowData.description)
    }
  ];

<<<<<<< HEAD
  return (
    <MaterialTable
      title="Dataset Table"
      columns={headCells}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              fetchDelete(oldData.datasetId, isAuthenticated, props);
              setDeleted(!isDeleted);
            }, 300);
          })
      }}
    />
  );
=======
  return (<MaterialTable title="Dataset Table" columns={headCells} data={data} editable={{

      onRowAdd: newData => new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 600);
      }),
      onRowUpdate: (newData, oldData) => new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 600);
      }),
      onRowDelete: oldData => new Promise(resolve => {
        setTimeout(() => {
          resolve();
          fetchDelete(oldData.datasetId, isAuthenticated, props);
          setDeleted(!isDeleted);
        }, 300);
      })
    }}/>);
>>>>>>> origin/master-backup
}
