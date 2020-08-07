import React, {useState, useEffect, useReducer} from 'react';
import {useSelector} from 'react-redux';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import {regExMapping} from  "../../utils/regExMapping";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { Helmet } from "react-helmet";
import { head } from "./head.js";
import { getMeta } from "./head.js";
import {lengthField2} from "../../utils/validationConstant"
import {vsampleName, vsampletypeid, vurl, vdescription, vsampledescriptor, vvalue} from '../../utils/validationConstant'

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
  const [errors, setErrors] = useState('');
  const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
      const name = e.target.name;
      const newValue = e.target.value;
      if(newValue.match(name === "name" ? regExMapping["sampleName"]: regExMapping[name])) {
        setErrors({...errors,[name]: false})
        setValue(newValue);}
      else {
        setErrors({...errors,[name]: true})
        setValue(newValue);
      }

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
  let serverError = false;
  const [descriptorError, setDescriptorError] = useState('')





  const handleClose = () => {
    props.history.push("/samplelist");
  }



  const handleAddDescriptor = (e) => {
    e.preventDefault();
    const errorList = Object.values(descriptorError);
    if(!descriptorError.hasOwnProperty("sample_descriptor_id")) {
      setDescriptorError({...descriptorError,"sample_descriptor_id": true})
      return
    }

    if(!descriptorError.hasOwnProperty("value")) {
      setDescriptorError({...descriptorError,"value": true})
      return
    }
    for(let i =0;i<errorList.length; i++ ){
        if(errorList[i])
        return
    }
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


  const handleChangeForMeasurement = (e) => {
    const newValue = e.target.value;
    if(newValue.match(regExMapping["unit_of_measurment"])) {
      setDescriptorError({...descriptorError,"unit_of_measurment": false})
      setMeasurement(newValue)}
    else {
      setDescriptorError({...descriptorError,"unit_of_measurment": true})
      setMeasurement(newValue)
    }
  }

  const handleChangeForValue = (e) => {
    const newValue = e.target.value;
    if(newValue.match(regExMapping["value"])) {
      setDescriptorError({...descriptorError,"value": false})
      setValue(newValue)}
    else {
      setDescriptorError({...descriptorError,"value": true})
      setValue(newValue)
    }
  }

  const handleSDescriptorChange = (e) => {
    const newValue = e.target.value;
    if(newValue.match(regExMapping["sample_descriptor_id"])) {
      setDescriptorError({...descriptorError,"sample_descriptor_id": false})
      setSDescriptor(newValue)}
    else {
      setDescriptorError({...descriptorError,"sample_descriptor_id": true})
      setSDescriptor(newValue)
    }
  }

  const handleReset = (e) => {
    setDescriptorError('')
    setValue("")
    setMeasurement("")
    setSDescriptor("")
  }

  async function handleSubmit(e) {
    e.preventDefault();
    serverError = false;
    const errorList1 = Object.values(descriptorError)
    for(let i =0;i<errorList1.length; i++ ){
        if(errorList1[i])
        return
    }
    const errorList = Object.values(errors);
    if(!errors.hasOwnProperty("name")) {
      setErrors({...errors,"name": true})
      return
    }

    if(!errors.hasOwnProperty("sample_type_id")) {
      setErrors({...errors,"sample_type_id": true})
      return
    }
    for(let i =0;i<errorList.length; i++ ){
        if(errorList[i])
        return
    }
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
     }).then(checkStatus).then(res => {
       if(serverError){
         setErrors({"Server Error" : res.message});
       } else {props.history.push("/samplelist")}}
   ).catch(error => console.log(error))
  }

  const checkStatus = res => {
    if(res.ok) {
      return res.text()
    } else {
      serverError = true;
      return res.json()
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
        { errors["serverError"] ?
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
              {errors["serverError"]}<strong> Check it out!</strong>
          </Alert>
            :
            ""
            }
        <Typography variant="h5" component="h3">
          Add Sample
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <div style={{ marginTop: "20px", width: "56.7%" }}>
            <TextField
              autoFocus
              required
              error = {errors["name"]}
              id="name"
              name = "name"
              label="Sample Name"
              size="small"
              {...name}
              className={classes.nameField}
              type="text"
              helperText = {errors["name"]?vsampleName:""}
              fullWidth
            />
          </div>
          <div style={{ marginTop: "20px", width: "56.7%" }}>
            <TextField
              id="sample_type"
              select
              name="sample_type_id"
              required
              error = {errors["sample_type_id"]}
              label="Sample Type"
              className={classes.textField1}
              {...sType}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText={errors["sample_type_id"]?vsampletypeid:""}
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
              error = {errors["url"]}
              className={classes.textField2}
              size="medium"
              id="url"
              name="url"
              {...url}
              label="URL"
              helperText = {errors["url"]?vurl:""}
              type="url"
              fullWidth
            />
          </div>

          <div style={{ marginTop: "20px", width: "56.7%" }}>
            <TextField
              id="standard-multiline-flexible"
              label="Description"
              name="description"
              error = {errors["description"]}
              multiline
              {...description}
              rowsMax="4"
              margin="normal"
              helperText = {errors["description"]?vdescription:""}
              fullWidth
            />
          </div>
          <form id="form1" >
            <div style={{ display: "flex", marginTop: "20px" }}>
              <TextField
                id="sample_descriptor"
                name="sample_descriptor_id"
                select
                error = {descriptorError["sample_descriptor_id"]}
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
                helperText= {descriptorError["sample_descriptor_id"]?vsampledescriptor:"Select Sample Descriptor"}

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
                error = {descriptorError["value"]}
                id="value"
                label="Value"
                value={value}
                onChange={e => handleChangeForValue(e)}
                className={classes.valueField}
                type="text"
                helperText = {descriptorError["value"]?vvalue:"Select Value"}
              />
              <TextField
                margin="dense"
                error = {descriptorError["unit_of_measurment"]}
                className={classes.textField2}
                value={measurement}
                id="unit_of_measurment"
                onChange={e => handleChangeForMeasurement(e)}
                label="Measurement Unit"
                type="text"
                helperText = {descriptorError["unit_of_measurment"]?lengthField2:"Select Measurement"}
              />

            <Button  type = "submit" className={classes.label} variant = "contained" color = "primary" onClick={e => handleAddDescriptor(e)} >

                Add Descriptor
              </Button>
              <Button  className={classes.label} variant = "contained" color = "primary" onClick={e => handleReset(e)} >
                  Reset Selection
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
