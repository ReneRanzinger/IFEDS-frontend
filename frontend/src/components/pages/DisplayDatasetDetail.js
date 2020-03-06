import React, {useState, useEffect,Component} from 'react'
import PropTypes  from 'prop-types';
import DatasetDetailDisplay from './DatasetDetailDisplay'
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import SideBar from "./Sidebar.js";
import MenuAppBar from "./MenuAppBar.js";
import { Helmet } from "react-helmet";

  const DisplayDatasetDetail = (props) => {
  const {match: { params }} = props;
  const [sampleData ] = useState();
  const [experimentType] = useState();
  const [fundingSource] = useState();
  const [keyword] = useState();

    return (
      <div>
        <div>
          <Helmet>
            <title>DatasetDetails</title>
            <meta name="description" content="Display Public DatasetDetails" />
            <meta name="theme-color" content="#008f68" />
          </Helmet>
          {/* ... */}
        </div>
        {!props.isAuthenticated ? (
          <div>
            <MenuAppBar props={props} />
          </div>
        ) : (
          <div>
            <SideBar props={props} />
          </div>
        )}
        {
          <DatasetDetailDisplay
            {...props}
            editDataset={false}
            sample={sampleData}
            experimentType={experimentType}
            fundingSource={fundingSource}
            keyword={keyword}
          />
        }
      </div>
    );
  }



DisplayDatasetDetail.propTypes = {
  logout: PropTypes.func
};

 function mapStateToProps(state) {
  return { isAuthenticated: state.user.token };
}
export default connect(mapStateToProps, { logout })(DisplayDatasetDetail);


