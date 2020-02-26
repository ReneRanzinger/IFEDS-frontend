import React, {useState, useEffect} from 'react'
import PropTypes  from 'prop-types';
import DatasetDetailDisplay from './DatasetDetailDisplay'
import SideBar from "./Sidebar";


const EditDatasetPage = (props) => {
  const {match: { params }} = props;
  const [sampleData ] = useState();
  const [experimentType] = useState();
  const [fundingSource] = useState();
  const [keyword] = useState();

  return (
    <div>
      <SideBar props={props} />
      {<DatasetDetailDisplay {...props}  editDataset = {false} sample = {sampleData} experimentType = {experimentType} fundingSource = {fundingSource} keyword = {keyword}/>}
    </div>

  )
}

EditDatasetPage.propTypes = {
  logout: PropTypes.func
}

export default EditDatasetPage
