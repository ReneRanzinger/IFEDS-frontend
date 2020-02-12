import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import PropTypes  from 'prop-types';
import DatasetDetailDisplay from './DatasetDetailDisplay'
import SideBar from "./Sidebar";

// const useFetch = (url) => {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     fetch(url, {
//       method: "GET"
//     }).then(response => response.json()).then(res => {
//       setData(res);
//       console.log()
//     }).catch(error => console.log(error));
//   }, [url]);
//   return [data];
// }

const EditDatasetPage = (props) => {
  const {match: { params }} = props;
  const isAuthenticated = useSelector(state => state.user.token);
//  const [dataset ] = useFetch(`/dataset/${params.id}`);
{/*datasetDetail = {dataset}*/}
  return (
    <div>
      <SideBar props={props} />
      {<DatasetDetailDisplay {...props}  editDataset = {true} />}
    </div>

  )
}

EditDatasetPage.propTypes = {
  logout: PropTypes.func
}

export default EditDatasetPage
