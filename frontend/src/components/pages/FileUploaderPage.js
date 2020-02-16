import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import PropTypes  from 'prop-types';
import FileUploadPage from './FileUploadPage'
import SideBar from "./Sidebar";
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";

const useFetch = (url) => {
  const isAuthenticated = useSelector(state => state.user.token);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      mode: 'cors',
      headers: setAuthorizationHeader(isAuthenticated)
    }).then(response => response.json()).then(res => {
      setData(res);
    }).catch(error => console.log(error));
  }, [isAuthenticated, url]);
  return [data];
}

const FileUploaderPage = (props) => {
  const [datasetTypeID ] = useFetch("/dataTypes");

  return (
    <div>
      <SideBar props={props} isDashBoard={"true"} />
      <FileUploadPage {...props} datasetTypeID = {datasetTypeID} />
    </div>

  )
}

FileUploaderPage.propTypes = {
  logout: PropTypes.func
}

export default FileUploaderPage