import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import FRC from 'formsy-react';
import Paper from '@material-ui/core/Paper';
import { withFormsy } from 'formsy-react';
import EmptyForm from 'emptyform';
import ReactResumableJs from './NewFileUploadPage'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const ContentInside =(props)=> {


  // mixins: [FRC.ParentContextMixin],
  // inputDisable: false,

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
                console.log(file, message);
              }}
              onFileAddedError={(file, errorCount) => {
                console.log("Anubhav1")
           console.log('error file added', file, errorCount);

         }}
              maxFiles={1}
            />

    );

}


ContentInside.propTypes= {
  children: PropTypes.node
}

class ExampleForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      files: [],
      datasetId : "",
      datasetTypeId : ""
    };
  }



  setFiles = (file, message) => {

    console.log('Message: ', message);

    let files = this.state.files.slice();
    files.push(file);

    this.setState({
      files: files
    });
  };

  submit = () => {
    console.log('Files: ', this.state.files);
    console.log(this.state);
  };

handleChange = (event) =>{
  this.setState({datasetId : event.target.value})
}
handleChangeForDatasetTypeID = event => {
    this.setState({datasetTypeID : event.target.value});
  };
  render() {
    const datasetTypeid = [
      {
        value: '1',
        label: '1',
      },
      {
        value: '2',
        label: '2',
      },
      {
        value: '3',
        label: '3',
      },
      {
        value: '4',
        label: '4',
      },
    ];
    return (<Paper style = {{padding: "15px", marginTop: "10px"}}>
      <form onSubmit={this.handleSubmit}>
        <div>
          <div style={{display: "flex",marginTop : "20px"}}>
          <TextField
          id="standard-basic"
          label="Dataset Field 1"
          required
          value = {this.state.datasetId}
          onChange = {this.handleChange}
          />

          <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    value={this.state.datasetTypeID}
                    onChange={this.handleChangeForDatasetTypeID}
                    helperText="Please select Dataset Type ID"
                    style = {{marginLeft : "30px"}}
                  >
                    {datasetTypeid.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
      </div>
      <div style={{display: "flex",marginTop : "20px"}}>
      <ContentInside setFiles={this.setFiles}/></div></div>
        <Button  type = "submit" variant="contained" color="primary">
          Submit
        </Button>

  </form>
  </Paper>
    );
  }
};

export default ExampleForm;
