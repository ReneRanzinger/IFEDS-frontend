import React, {useState, useEffect,Component} from 'react'
import PropTypes  from 'prop-types';
import DatasetDetailDisplay from './DatasetDetailDisplay'
import SideBar from "./Sidebar";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";

  const EditDatasetPage = (props) => {
  const {match: { params }} = props;
  const [sampleData ] = useState();
  const [experimentType] = useState();
  const [fundingSource] = useState();
  const [keyword] = useState();

    return (
      <div>
        <SideBar props={props} isDashBoard={"false"} />
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



EditDatasetPage.propTypes = {
  logout: PropTypes.func
};

 function mapStateToProps(state) {
  return { isAuthenticated: state.user.token };
}
export default connect(mapStateToProps, { logout })(EditDatasetPage);


