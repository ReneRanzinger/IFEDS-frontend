import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import ReadMoreAndLess from "react-read-more-less";
import { Link } from "react-router-dom";
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import { createMuiTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";

import Tooltip from "@material-ui/core/Tooltip";

const useFetch = (url, isDeleted, props) => {
  const isAuthenticated = useSelector(state => state.user.token);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: setAuthorizationHeader(isAuthenticated)
    })
      .then(response => response.json())
      .then(res => {
        if (res.status === 401) {
          props.props.logout();
        } else {
          setData(res);
        }
      })
      .catch(error => console.log(error));
  }, [isAuthenticated, url, isDeleted]);
  return [data, setData];
};

const fetchDelete = (id, isAuthenticated, props) => {
  fetch(`/samples/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: setAuthorizationHeader(isAuthenticated)
  })
    .then(response => response.json())
    .then(res => {
      if (res.status === 401) {
        props.props.logout();
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export default function SampleList(props) {
  const isAuthenticated = useSelector(state => state.user.token);
  const [isDeleted, setDeleted] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [data] = useFetch("/getSample", isDeleted, props);
  const [sampleDescriptor] = useFetch("/SampleDescriptors");
  const [sampleType] = useFetch("/SampleTypes");
  const classes = useToolbarStyles();

  const handleDescription = description => {
    return (
      <ReadMoreAndLess
        className="read-more-content"
        charLimit={125}
        readMoreText="...read more"
        readLessText="...read less"
      >
        {description}
      </ReadMoreAndLess>
    );
  };

  const handleUrl = url => {
    return <Link to={url}>{url}</Link>;
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const headCells = [
    {
      field: "name",
      title: "Sample Name"
    },
    {
      field: "sample_type_id",
      title: "Sample Type Id"
    },
    {
      field: "url",
      title: "Url",
      render: rowData => handleUrl(rowData.url)
    },
    {
      field: "description",
      title: "Sample Description",
      sorting: false,
      searchable: false,
      render: rowData => handleDescription(rowData.description)
    }
  ];

  return (
    <div>
      <MaterialTable
        title="Sample List"
        columns={headCells}
        data={data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                fetchDelete(oldData.sampleId, isAuthenticated, props);
                setDeleted(!isDeleted);
              }, 300);
            })
        }}
        components={{
          Toolbar: props => (
            <Paper style={{ display: "flex" }}>
              <MTableToolbar classes={{ root: classes.root }} {...props} />
              <Tooltip title="Add New Sample">
                <Icon
                  style={{
                    color: grey[600],
                    height: "64px",
                    padding: "16px 0px 16px 0px",
                    margin: "0px 20px"
                  }}
                  onClick={handleAddClick}
                >
                  add_box
                </Icon>
              </Tooltip>
            </Paper>
          )
        }}
        localization={{
          body: {
            editRow: {
              backgroundColor: "#f06060"
            }
          }
        }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {console.log(sampleDescriptor)}
        <DialogTitle id="form-dialog-title">Add New Sample</DialogTitle>
        <form className={classes.form} onSubmit={{}}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Sample Name"
              type="text"
              fullWidth
            />
            <TextField
              id="sample_type"
              select
              label="Sample Type"
              className={classes.textField}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="Please select sample type"
              margin="normal"
            >
              {sampleType.map(option => (
                <option key={option.sampleTypeId} value={option.sampleTypeId}>
                  {option.name}
                </option>
              ))}
            </TextField>
            <TextField
              margin="dense"
              id="url"
              label="URL"
              type="email"
              fullWidth
            />
            <TextField
              id="standard-multiline-flexible"
              label="Description"
              multiline
              rowsMax="4"
              margin="normal"
              fullWidth
            />
            <TextField
              id="sample_descriptor"
              select
              label="Sample Descriptor"
              className={classes.textField}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="Please select sample descriptor"
              margin="normal"
            >
              {sampleDescriptor.map(option => (
                <option
                  key={option.sample_descriptor_id}
                  value={option.sample_descriptor_id}
                >
                  {option.name}
                </option>
              ))}
            </TextField>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" onClick={handleClose} color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const useToolbarStyles = makeStyles(theme => ({
  root: {
    flex: 1
  },
  spacer: {
    flex: 1
  },
  spacer1: {
    flexGrow: 2,
    marginRight: theme.spacing(2)
  },
  textField: {
    marginRight: theme.spacing(1),
    width: 200
  },
  menu: {
    width: 200
  }
}));
