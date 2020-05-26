import React, {useState, useEffect, useReducer} from 'react';
import {useSelector} from 'react-redux';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { Helmet } from "react-helmet";
import { head } from "./head.js";
import { getMeta } from "./head.js";

import {SampleDescriptors, SampleTypes, Sample} from '../../apiCalls'


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
  return [data, setData];
}



export default function AddSample(props) {
  const classes = useToolbarStyles();
  const [validateSample, setValidateSample] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      nameError : "",
      typeError : "",
      urlError : "",
      descError : ""
    }
  );

  const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
      const name = `${e.target.name}Error`
      setValidateSample({...validateSample, [name] : "" })
      setValue(e.target.value);
    }
     return {
       value,
       onChange:handleChange
     };
  }

  const name = useFormInput();
  const url = useFormInput(null);
  const description = useFormInput(null);
  const sType = useFormInput();
  const [sDescriptor, setSDescriptor] = useState();
  const [value,setValue] = useState();
  const [measurement, setMeasurement] = useState();
  const [sampleDesc, setSampleDesc] = useState({data: []});
  const [isDescriptorAdded,setIsDescriptorAdded] = useState(false);
  const [isThereAnySampleDesc,setIsThereAnySampleDesc] = useState(false);
  const [sampleDescriptor] = useFetch(SampleDescriptors);
  const [sampleType] = useFetch(SampleTypes);
  const isAuthenticated = useSelector(state => state.user.token);
  const sidebar = useSelector(state => state.sidebar);
  const nullField = "This field cannot be null. Please fill"
  const lengthField = "Length should be less than 50 characters"
  const lengthField1 = "Length should be less than 64 characters"
  const lengthField2 = "Length should be less than 256 characters"
  const lengthField3 = "Length should be less than 1000 characters"

  const [validateUserDesc, setValidateUserDesc] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      descError : "",
      valueError : "",
      measurementError : ""
    }
  );





  const handleClose = () => {
    props.history.push("/samplelist");
  }

  const handleValidationErrorForDesc = () => {
    if ((sDescriptor == null || sDescriptor  === "") && (value == null || value === "") ) {
      setValidateUserDesc({descError : nullField , valueError : nullField})
      return true
    }
    else if (sDescriptor == null || sDescriptor === "") {
      setValidateUserDesc({descError : nullField})
      return true
    }
    else if (value == null || value === "") {
      setValidateUserDesc({valueError : nullField})
      return true
    }
    else if (value.length > 64) {
      setValidateUserDesc({valueError : lengthField1})
      return true
    }
    else if (measurement != null  && measurement.length > 256) {
      setValidateUserDesc({measurementError : lengthField2})
      return true
    }
    return false
  }

  const handleAddDescriptor = (e) => {
    e.preventDefault();
    const error = handleValidationErrorForDesc()
    if (error === false) {
      let count=false;
      setSampleDesc(sampleDesc => {
      const data = [...sampleDesc.data];
      for (var i = 0; i < sampleDesc["data"].length; i++) {
        if (sampleDesc["data"][i][0] === sDescriptor && sampleDesc["data"][i][1] === value ) {
          count = true;
          break;
        }
      }

      if(!count) {
        if(measurement!= null) {
        data.push([sDescriptor, value , measurement]);
      } else {
        data.push([sDescriptor, value , ""]);
      }}
        return {...sampleDesc , data}
      });
      setValue("")
      setMeasurement("")
      setSDescriptor("")

      setIsDescriptorAdded(true);
  }
  }

  const handleChangeForMeasurement = (e) => {
    setValidateUserDesc({...validateUserDesc,measurementError : ""})
    setMeasurement(e.target.value)
  }

  const handleChangeForValue = (e) => {
    setValidateUserDesc({...validateUserDesc,valueError : ""})
    setValue(e.target.value)
  }

  const handleSDescriptorChange = (e) => {
    setValidateUserDesc({...validateUserDesc,descError : ""})
    setSDescriptor(e.target.value)
  }

  const handleValidationErrorForSample = () => {
    const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if ((name.value == null || name.value  === "") && (sType.value == null || sType.value === "") ) {
      setValidateSample({nameError : nullField , typeError : nullField})
      return true
    }
    else if (url.value.trim().length !== 0 && !pattern.test(url.value)) {
      console.log(url.value)
      setValidateSample({urlError : "Invalid URL"})
      return true
    }
    else if (description.value != null && description.value.length >1000 ) {
      setValidateSample({descError : lengthField3 })
      return true
    }
    else if (name.length > 50 || url.length > 256) {
      if(name.length > 50) {
        setValidateSample({nameError : lengthField})}
      if(url.length > 256) {
        setValidateSample({...validateSample, urlError : lengthField2})}

      return true
    }
    return false
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const error = handleValidationErrorForSample()
    if (error === false) {
        let listOfSampleDesc = sampleDesc['data'].map((a,row) => {
        let sampleDescId = sampleDescriptor.filter(x => x["name"]=== a[0])[0]["sample_descriptor_id"];
        let  sampleDescriptorArray = { "sample_descriptor_id" :sampleDescId,
                                       "sample_descriptor_value": a[1],
                                       "unit_of_measurment":a[2]}

        return sampleDescriptorArray
    })
    fetch(Sample,{
       method: "POST",
       headers: setAuthorizationHeader(isAuthenticated),
       body: JSON.stringify({
           "name": name.value,
           "sample_type_id" : parseInt(sType.value),
           "url" : url.value,
           "description": description.value,
           "sample_descriptors" : listOfSampleDesc
       })
     }).then(res => console.log(res))
    props.history.push("/samplelist");
  }
  }

  const handleDelete = (e,index) => {
    setSampleDesc(sampleDesc => {
                const data = [...sampleDesc.data];
                data.splice(index, 1);
                return { ...sampleDesc, data };
              });
  }
  useEffect(() => {
      if (isDescriptorAdded) {
        setIsThereAnySampleDesc(true)
      }
      setIsDescriptorAdded(false);
    },[isDescriptorAdded]);

  return (
    <div>
      <Paper className={sidebar ? classes.root1 : classes.root}>
        <Typography variant="h5" component="h3">
          Add Sample
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <div style={{ marginTop: "20px", width: "56.7%" }}>
            <TextField
              autoFocus
              required
              error = {validateSample.nameError !== "" ? true : false}
              id="name"
              name = "name"
              label="Sample Name"
              size="small"
              {...name}
              className={classes.nameField}
              type="text"
              helperText = {validateSample.nameError ? validateSample.nameError: ""}
              fullWidth
            />
          </div>
          <div style={{ marginTop: "20px", width: "56.7%" }}>
            <TextField
              id="sample_type"
              select
              name="type"
              required
              error = {validateSample.typeError !== "" ? true : false}
              label="Sample Type"
              className={classes.textField1}
              {...sType}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText={validateSample.typeError ? validateSample.typeError: "Please select sample type"}
              margin="normal"
            >
              <option value="" />
              {sampleType.map(option => (
                <option key={option.sampleTypeId} value={option.sampleTypeId}>
                  {option.name}
                </option>
              ))}
            </TextField>
            <TextField
              margin="dense"
              error = {validateSample.urlError !== "" ? true : false}
              className={classes.textField2}
              size="medium"
              id="url"
              name="url"
              {...url}
              label="URL"
              helperText = {validateSample.urlError ? validateSample.urlError: "Please input URL"}
              type="url"
              fullWidth
            />
          </div>

          <div style={{ marginTop: "20px", width: "56.7%" }}>
            <TextField
              id="standard-multiline-flexible"
              label="Description"
              name="desc"
              error = {validateSample.descError !== "" ? true : false}
              multiline
              {...description}
              rowsMax="4"
              margin="normal"
              helperText = {validateSample.descError ? validateSample.descError: "Please input Description"}
              fullWidth
            />
          </div>
          <form id="form1" >
            <div style={{ display: "flex", marginTop: "20px" }}>
              <TextField
                id="sample_descriptor"
                select
                error = {validateUserDesc.descError !== "" ? true : false}
                label="Sample Descriptor"
                className={classes.textField1}
                value = {sDescriptor}
                onChange = {e => handleSDescriptorChange(e)}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                helperText= {validateUserDesc.descError ?validateUserDesc.descError: "Please select sample Descriptor"}

                margin="normal"
              >
                <option value="" />
                {sampleDescriptor.map(option => (
                  <option key={option.sample_descriptor_id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </TextField>
              <TextField
                error = {validateUserDesc.valueError!== "" ? true : false }
                id="value"
                label="Value"
                value={value}
                onChange={e => handleChangeForValue(e)}
                className={classes.valueField}
                type="text"
                helperText = {validateUserDesc.valueError ?validateUserDesc.valueError: "Please fill value"}
              />
              <TextField
                margin="dense"
                error = {validateUserDesc.measurementError !== "" ? true : false}
                className={classes.textField2}
                value={measurement}
                id="unit_of_measurment"
                onChange={e => handleChangeForMeasurement(e)}
                label="Measurement Unit"
                type="text"
                helperText = {validateUserDesc.measurementError ?validateUserDesc.measurementError: "Please fill measurement unit"}
              />

            <Button  type = "submit" className={classes.label} variant = "contained" color = "primary" onClick={e => handleAddDescriptor(e)} >

                Add Sample Descriptor
              </Button>
            </div>
          </form>
          <div style={{ marginTop: "40px" }}>
            {isThereAnySampleDesc &&
              sampleDesc.data.map((row, index) => {
                const ret = `${row[0]} :\xa0\xa0   ${row[1]}   \xa0   ${row[2]}`;
                return (
                  <div className = {classes.tick}>
                    <Chip
                      size="medium"
                      variant="outlined"
                      label={ret}
                      onDelete={e => handleDelete(e, index)}
                    />
                  </div>
                );
              })}
          </div>
          <div style={{ marginTop: "40px" }}>
            <Button
              style={{ marginRight: "20px" }}
              onClick={handleClose}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </div>
        </form>
      </Paper>
      <div>
        <Helmet>
          <title>{head.addsample.title}</title>
          {getMeta(head.addsample)}
        </Helmet>
      </div>
    </div>
  );



}


const drawerWidth = 240;

  const useToolbarStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      marginTop: theme.spacing(2),
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    root1: {
      padding: theme.spacing(3, 2),
      marginTop: theme.spacing(2),
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    textField1 :{
      marginRight: theme.spacing(15)
    },
    textField2 :{
      marginTop: theme.spacing(2.3)
    },
    nameField :{
      marginTop: theme.spacing(2.3),
      marginRight: theme.spacing(15)
    },
    valueField: {
      marginTop:theme.spacing(2.3),
      marginRight: theme.spacing(11)
    },
    tick : {
      marginTop: theme.spacing(1)
    },
    label: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(3),
      marginBottom: theme.spacing(3)
    },
    menu: {
      width: 200,
    }
  }));
