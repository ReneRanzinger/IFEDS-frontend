import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import MaterialTable from 'material-table';
import ReadMoreAndLess from 'react-read-more-less';
import {Link} from 'react-router-dom';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";

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

export default function MaterialTableDemo(props) {
  const isAuthenticated = useSelector(state => state.user.token);
  const [isDeleted, setDeleted] = useState(false);
  const [data] = useFetch("/getSample", isDeleted, props);

  const handleDescription = (description) => {
    return (<ReadMoreAndLess className="read-more-content" charLimit={125} readMoreText="...read more" readLessText="...read less">
      {description}
    </ReadMoreAndLess>);
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
          fetchDelete(oldData.sampleId, isAuthenticated, props);
          setDeleted(!isDeleted);
        }, 300);
      })
    }}/>);
}
