import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import PropTypes  from 'prop-types';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import DatasetDetailDisplay from './DatasetDetailDisplay'
import {SampleData, ExperimentType, FundingSource, Keyword} from '../../apiCalls'
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import MenuAppBar from "./MenuAppBar.js";
import SideBar from "./Sidebar";
import { Helmet } from "react-helmet";
import { head } from "./head.js";
import { getMeta } from "./head.js";


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
  const [keyword] = useFetch(Keyword)

  return (
    <div>
      <SideBar props={props} isDashBoard={"true"} />
      {
        <DatasetDetailDisplay
          {...props}
          editDataset={true}
          sample={sampleData}
          experimentType={experimentType}
          fundingSource={fundingSource}
          keyword={keyword}
        />
      }

      <div>
        <Helmet>
          <title>{head.editdataset.title}</title>
          {getMeta(head.editdataset)}
        </Helmet>
      </div>
    </div>
  );
}




EditDatasetPage.propTypes = {
  logout: PropTypes.func
}


function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.token
  };
}


export default connect(mapStateToProps, { logout })(EditDatasetPage);
