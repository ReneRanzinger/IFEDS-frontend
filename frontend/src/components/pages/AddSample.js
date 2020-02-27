import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';

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

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }
   return {
     value,
     onChange:handleChange
   };
}

export default function AddSample(props) {
  const classes = useToolbarStyles();
  const name = useFormInput();
  const url = useFormInput(null);
  const description = useFormInput(null);
  const sType = useFormInput();
  const sDescriptor = useFormInput();
  const [value,setValue] = useState();
  const [measurement, setMeasurement] = useState();
  const [sampleDesc, setSampleDesc] = useState({data: []});
  const [isDescriptorAdded,setIsDescriptorAdded] = useState(false);
  const [isThereAnySampleDesc,setIsThereAnySampleDesc] = useState(false);
  const [sampleDescriptor] = useFetch(SampleDescriptors);
  const [sampleType] = useFetch(SampleTypes);
  const isAuthenticated = useSelector(state => state.user.token);
  let bearer = 'Bearer '

  const handleClose = () => {
    props.history.push("/samplelist");
  }

  const handleAddDescriptor = (e) => {
    e.preventDefault();
    let count=false;
    setSampleDesc(sampleDesc => {
      const data = [...sampleDesc.data];
  for (var i = 0; i < sampleDesc["data"].length; i++) {
  if (sampleDesc["data"][i][0] === sDescriptor.value && sampleDesc["data"][i][1] === value && sampleDesc["data"][i][2] === measurement) {
    count = true;
    break;
  }
}

    if(!count) {
      if(measurement!= null) {
      data.push([sDescriptor.value, value , measurement]);
    } else {
      data.push([sDescriptor.value, value , ""]);
    }}
      return {...sampleDesc , data}
    });
    setIsDescriptorAdded(true);
  }

  const handleChangeForMeasurement = (e) => {
    setMeasurement(e.target.value)
  }

  const handleChangeForValue = (e) => {
    setValue(e.target.value)
  }

async function handleSubmit(e) {
  e.preventDefault();
  let listOfSampleDesc = sampleDesc['data'].map((a,row) => {
      console.log(sampleDescriptor);
      let sampleDescId = sampleDescriptor.filter(x => x["name"]=== a[0])[0]["sample_descriptor_id"];
      let  sampleDescriptorArray = { "sample_descriptor_id" :sampleDescId,
                                     "sample_descriptor_value": a[1],
                                     "unit_of_measurment":a[2]}

      return sampleDescriptorArray
  })
  console.log(name.value)
  const response =  await fetch(Sample,{
     method: "POST",
     headers: {
         "Content-Type" : "application/json",
         "Accept": "application/json",
         'Authorization': bearer+isAuthenticated
     },
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
    <Paper className={classes.root}>
     
      <Typography variant="h5" component="h3">
        Add Sample
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div style={{ marginTop: "20px", width: "56.7%" }}>
          <TextField
            autoFocus
            required
            id="name"
            label="Sample Name"
            size="small"
            {...name}
            className={classes.nameField}
            type="text"
            fullWidth
          />
      </div>
      <div style={{ marginTop: "20px", width: "56.7%" }} >
          <TextField
            id="sample_type"
            select
            required
            label="Sample Type"
            className={classes.textField1}
            {...sType}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Please select sample type"
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
            className={classes.textField2}
            size="medium"
            id="url"
            {...url}
            label="URL"
            type="email"
            fullWidth
          />
        </div>

        <div style={{ marginTop: "20px", width: "56.7%" }}>
          <TextField
            id="standard-multiline-flexible"
            label="Description"
            multiline
            {...description}
            rowsMax="4"
            margin="normal"
            fullWidth
          />
        </div>
        <form id="form1">
          <div style={{ display: "flex", marginTop: "20px" }}>
            <TextField
              id="sample_descriptor"
              select
              label="Sample Descriptor"
              className={classes.textField1}
              {...sDescriptor}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="Please select sample Descriptor"
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
              id="value"
              label="Value"
              onChange={e => handleChangeForValue(e)}
              className={classes.valueField}
              type="text"
            />
            <TextField
              margin="dense"
              className={classes.textField2}
              id="unit_of_measurment"
              onChange={e => handleChangeForMeasurement(e)}
              label="Measurement Unit"
              type="text"
            />
            <Tooltip title="Add Sample Descriptor">
              <AddCircleIcon
                className={classes.tick}
                onClick={e => handleAddDescriptor(e)}
              />
            </Tooltip>
            <Typography className={classes.label}>
              {" "}
              Add Sample Descriptor{" "}
            </Typography>
          </div>
        </form>
        <div style={{ marginTop: "40px" }}>
          {isThereAnySampleDesc &&
            sampleDesc.data.map((row, index) => {
              const ret = `${row[0]} :\xa0\xa0   ${row[1]}   \xa0   ${row[2]}`;
              return (
                <div>
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
  );

  

}

  const useToolbarStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      marginTop: theme.spacing(2)
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
      marginTop: theme.spacing(5),
      marginLeft: theme.spacing(15)
    },
    label: {
      marginLeft: theme.spacing(3),
      paddingTop: theme.spacing(5)
    },
    menu: {
      width: 200,
    }
  }));
