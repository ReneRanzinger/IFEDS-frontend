import React, {useState, useEffect, useReducer} from 'react';
import {useSelector} from 'react-redux';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import {Sample, SampleTypes, SampleDescriptors} from '../../apiCalls'
import { Helmet } from "react-helmet";
import { head } from "../pages/head.js";
import { getMeta } from "../pages/head.js";
import {nullField, lengthField, lengthField1,lengthField2,lengthField3} from "../../utils/validationConstant"

const useFetch = (url,props) => {
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


export default function SampleForm(props) {
  const { match: { params } } = props;
  const classes = useToolbarStyles();
  const [validateSample, setValidateSample] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      nameError : "",
      sample_type_idError : "",
      urlError : "",
      descError : ""
    }
  );
  const [sampleDescriptor] = useFetch(SampleDescriptors,props);
  const [sampleType] = useFetch(SampleTypes,props);
  const [sDescriptor, setSDescriptor] = useState();
  const [value,setValue] = useState();
  const [measurement, setMeasurement] = useState();
  const [sampleDesc, setSampleDesc] = useState({data: []});
  const [isDescriptorAdded,setIsDescriptorAdded] = useState(false);
  const [isThereAnySampleDesc,setIsThereAnySampleDesc] = useState(true);
  const [sampleData, setSampleData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      sample_type_id : "",
      url : "",
      description: "",
      sample_descriptors : []
    }
  );

  const [validateUserDesc, setValidateUserDesc] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      descError : "",
      valueError : "",
      measurementError : ""
    }
  );

  const handleChange1 = e => {
      const name = e.target.name;
      const newValue = e.target.value;
      const nameError = `${e.target.name}Error`
      setValidateSample({...validateSample, [nameError] : "" })
      setSampleData({ [name]: newValue });
    };
  const isAuthenticated = useSelector(state => state.user.token);
  const sidebar = useSelector(state => state.sidebar);

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
  }}

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

    if ((sampleData.name == null || sampleData.name  === "") && (sampleData.sample_type_id == null || sampleData.sample_type_id === "") ) {
      setValidateSample({nameError : nullField , sample_type_idError : nullField})
      return true
    }
    else if (sampleData.url.trim().length !== 0 && !pattern.test(sampleData.url)) {
      setValidateSample({urlError : "Invalid URL"})
      return true
    }
    else if (sampleData.description != null && sampleData.description.length >1000 ) {
      setValidateSample({descError : lengthField3 })
      return true
    }
    else if (sampleData.name.length > 50 || sampleData.url.length > 256) {
      if(sampleData.name.length > 50) {
        setValidateSample({nameError : lengthField})}
      if(sampleData.url.length > 256) {
        setValidateSample({...validateSample, urlError : lengthField2})}

      return true
    }
    return false
  }

async function handleSubmit(e) {
  const { match: { params } } = props;
  e.preventDefault();
  const error = handleValidationErrorForSample()
  if (error === false) {
  let listOfSampleDesc = sampleDesc['data'].map((a,row) => {
      let sampleDescId = sampleDescriptor.filter(x => x["name"]=== a[0])[0]["sample_descriptor_id"];
      let  sampleDescriptorArray = { "sample_descriptor_id" : parseInt(sampleDescId),
                                     "sample_descriptor_value": a[1],
                                     "unit_of_measurment":a[2]}

      return sampleDescriptorArray
  })
  fetch(`${Sample}/${params.id}`,{
     method: "PUT",
     headers: setAuthorizationHeader(isAuthenticated),
     body: JSON.stringify({
         "name": sampleData["name"],
         "sample_type_id" : parseInt(sampleData["sample_type_id"]),
         "url" : sampleData["url"],
         "description": sampleData["description"],
         "sample_descriptors" : listOfSampleDesc
     })
   }).then(res => console.log(res))
  props.history.push("/samplelist");
}}

useEffect(() => {
  fetch(`${Sample}/${params.id}`, {
    method: "GET",
    mode: 'cors',
    headers: setAuthorizationHeader(isAuthenticated)
  }).then(response => response.json()).then(res => {
    setSampleData(res);
    const tempSampleDescriptor = res["sampleDescriptors"].map((a,row) => {
    if(a["unitOfMeasurement"] != null) {
    return [a["sampleDescriptor"]["name"],a["value"],a["unitOfMeasurement"]]
  } else {
    return [a["sampleDescriptor"]["name"],a["value"],""]
  }
  })
    setSampleDesc({data : tempSampleDescriptor})
  }).catch(error => console.log(error));
}, [isAuthenticated,params.id]);

/* This test useEffort ends here*/

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
      <div>
        <Helmet>
          <title>{head.editsampleform.title}</title>
          {getMeta(head.editsampleform)}
        </Helmet>
      </div>
      <Paper className={sidebar ? classes.root1 : classes.root}>
        <Typography variant="h5" component="h3">
          Edit Sample
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <div style={{ marginTop: "20px", width: "56.7%" }}>
            <TextField
              autoFocus
              required
              error = {validateSample.nameError !== "" ? true : false}
              id="name"
              label="Sample Name"
              name="name"
              size="small"
              value={sampleData.name}
              defaultValue={sampleData.name}
              onChange={handleChange1}
              className={classes.nameField}
              helperText = {validateSample.nameError ? validateSample.nameError: ""}
              type="text"
              fullWidth
            />
            <TextField
              id="sample_type_id"
              select
              required
              error = {validateSample.sample_type_idError !== "" ? true : false}
              name="sample_type_id"
              value={sampleData.sample_type_id}
              defaultValue={sampleData.sample_type_id}
              onChange={handleChange1}
              label="Sample Type"
              className={classes.textField1}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText={validateSample.sample_type_idError ? validateSample.typeError: "Please select sample type"}
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
              className={classes.textField2}
              error = {validateSample.urlError !== "" ? true : false}
              size="medium"
              id="url"
              name="url"
              value={sampleData.url}
              defaultValue={sampleData.url}
              onChange={handleChange1}
              helperText = {validateSample.urlError ? validateSample.urlError: "Please input URL"}
              label="URL"
              type="url"
              fullWidth
            />
          </div>
          <div style={{ marginTop: "20px", width: "56.7%" }}>
            <TextField
              id="standard-multiline-flexible"
              label="Description"
              multiline
              error = {validateSample.descError !== "" ? true : false}
              name="description"
              value={sampleData.description}
              defaultValue={sampleData.description}
              onChange={handleChange1}
              rowsMax="4"
              margin="normal"
              helperText = {validateSample.descError ? validateSample.descError: "Please input Description"}
              fullWidth
            />
          </div>
          <form id="form1">
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
                className={classes.textField2}
                error = {validateUserDesc.measurementError !== "" ? true : false}
                id="unit_of_measurment"
                value={measurement}
                onChange={e => handleChangeForMeasurement(e)}
                label="Measurement Unit"
                helperText = {validateUserDesc.measurementError ?validateUserDesc.measurementError: "Please fill measurement unit"}
                type="text"
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
              Save
            </Button>
          </div>
        </form>
      </Paper>
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
