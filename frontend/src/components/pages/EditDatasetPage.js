import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import PropTypes  from 'prop-types';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import DatasetDetailDisplay from './DatasetDetailDisplay'
import SideBar from "./Sidebar";
import {SampleData, ExperimentType, FundingSource} from '../../apiCalls'

const useFetch = (url) => {
  const isAuthenticated = useSelector(state => state.user.token);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: setAuthorizationHeader(isAuthenticated)
    }).then(response => response.json()).then(res => {
      setData(res);
      console.log()
    }).catch(error => console.log(error));
  }, [url, isAuthenticated]);
  return [data];
}

const EditDatasetPage = (props) => {
  const {match: { params }} = props;
  const [sampleData ] = useFetch(SampleData);
  const [experimentType] = useFetch(ExperimentType)
  const [fundingSource] = useFetch(FundingSource)

  return (
    <div>
      <SideBar props={props} />
      {<DatasetDetailDisplay {...props}  editDataset = {true} sample = {sampleData} experimentType = {experimentType} fundingSource = {fundingSource}/>}
    </div>

  )
}

EditDatasetPage.propTypes = {
  logout: PropTypes.func
}

export default EditDatasetPage
