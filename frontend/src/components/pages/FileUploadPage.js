import React from 'react';
import {useSelector} from 'react-redux';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import ReactResumableJs from './NewFileUploadPage'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import {DatasetFileSaveInfo} from '../../apiCalls'


const ContentInside =(props)=> {
  const token = useSelector(state => state.user.token);
    return (
          <ReactResumableJs
              uploaderID="default-resumable-uploader"
              dropTargetID="myDropTarget"
              fileAccept="*/*"
              chunkSize="6024000"
              tmpDir="http://localhost:3000/tmp/"
              maxFileSize="1024000000"
              fileAddedMessage="Started!"
              completedMessage="Complete!"
              service="/dataset/file/upload"
              textLabel="Upload files    "
              startButton={true}
              cancelButton={true}
              pauseButton={true}
              previousText="Drop to upload your media:"
              disableDragAndDrop={false}
              headerObject={{Accept: "application/json", Authorization : "Bearer "+ token, DatasetID: "71", DataTypeID:"1"} }
              onFileSuccess={(file, message) => {
               props.setFiles(file, message)
              }}
              onFileRemoved ={(file) => {
                // fetch()
                return file;
              }

              }
              maxFiles={1}
            />
    );
}

ContentInside.propTypes= {
  children: PropTypes.node
}

class FileUploadPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      datasetTypeIdValue : "",
      message: "",
      datasetId : props.match.params.id,
      fileId : "",
      description : ""
    };
    console.log(props)
  }

  static getDerivedStateFromProps = (props, state) => {
     return {datasetTypeID: props.datasetTypeID };
    }

  setFiles = (file, message) => {
    let obj = JSON.parse(message)
    let files = this.state.files.slice();
    files.push(file);

    this.setState({
      files: files,
      message: obj.message,
      fileId : obj.fileId
    });
  };

handleChange = (event) => {
  this.setState({[event.target.name] : event.target.value})
}

handleChangeDatasetType = (event) => {
  this.setState({datasetTypeIdValue : event.target.value})
}

handleClose = () => {
  this.props.history.push("/datasettable");
}

handleSubmit = (event) => {
  event.preventDefault();
  fetch(DatasetFileSaveInfo, {
    method: "POST",
    mode: 'cors',
    headers: setAuthorizationHeader(this.props.isAuthenticated),
    body: JSON.stringify({
      "file_id" : parseInt(this.state.fileId),
      "data_type_id" : parseInt(this.state.datasetTypeIdValue),
      "description" : this.state.description,
      "dataset_id" : parseInt(this.props.match.params.id),
    })
  }).then(response => response.json()).then(res => {
      this.props.history.push("/datasettable");
  }).catch(error => {
    console.log(error)
  });
}

  render() {
    return (<Paper style = {{padding: "15px", marginTop: "10px"}}>
      <form onSubmit={this.handleSubmit}>
        <div>
          <div style={{display: "flex",marginTop : "20px", marginBottom : "50px"}}>
          <TextField
                    id="dataTypeId"
                    select
                    required
                    label="Dataset Type"
                    value={this.state.datasetTypeIdValue}
                    onChange={this.handleChangeDatasetType}
                    helperText="Please select Dataset Type"
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: "menu"
                      }
                    }}
                    style = {{marginRight : "50px"}}
                  >
                  <option value="" />
                    {
                      (this.state.datasetTypeID).map(option => (
                        <option key={option.dataTypeId} value={option.dataTypeId}>
                          {option.name}
                        </option>
                      ))
                    }
                  </TextField>
                  <TextField
                    id="standard-multiline-flexible"
                    label="Description"
                    multiline
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    rowsMax="4"
                    fullWidth
                  />
      </div>
      <div style={{display: "flex",marginTop : "20px", marginBottom : "20px"}}>
        <ContentInside setFiles={this.setFiles}/>
      </div>
    </div>
        <Button  type = "submit" variant="contained" color="primary" disabled={!this.state.message}>
          Submit
        </Button>
        <Button
          style={{ marginLeft: "20px" }} onClick={this.handleClose} variant="contained" color="primary">
          Cancel
        </Button>
  </form>
  </Paper>
    );
  }
};

FileUploadPage.propTypes = {
  isAuthenticated : PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.token
  };
}

export default connect(mapStateToProps)(FileUploadPage);
