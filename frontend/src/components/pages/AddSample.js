import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import SampleList from './SampleList';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import Tooltip from '@material-ui/core/Tooltip';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

import Button from '@material-ui/core/Button';


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
  const url = useFormInput();
  const description = useFormInput();
//  const value = useFormInput();
  const sType = useFormInput();
  const sDescriptor = useFormInput();
  //const measurement = useFormInput();
  const [value,setValue] = useState();
  const [measurement, setMeasurement] = useState();
  const [sampleDesc, setSampleDesc] = useState({data: []});
  const [isDescriptorAdded,setIsDescriptorAdded] = useState(false);
  const [isThereAnySampleDesc,setIsThereAnySampleDesc] = useState(false);
  const [sampleDescriptor] = useFetch("/SampleDescriptors");
  const [sampleType] = useFetch("/SampleTypes");
  let set = new Set();

  const handleClose = () => {
    console.log(sDescriptor);
    console.log(sType);
    console.log(name);
    console.log(sampleDesc);
    props.history.push("/dashboard");
  }

  const handleAddDescriptor = (e) => {
    e.preventDefault();
    // console.log(value);
    // console.log(measurement);
    const trye = value;
    const tyre1 = measurement;
//    console.log(value);
    set.add(trye+tyre1);
//    setSampleDesc(set);
    setSampleDesc(sampleDesc => {
      const data = [...sampleDesc.data];
      console.log(data);
      data.push([sDescriptor.value,value , measurement]);
      console.log(data);
      return {...sampleDesc , data}
    });
    console.log(sampleDesc);
    // console.log(set);
    setIsDescriptorAdded(true);

  //  document.getElementById("form1").reset();
  }

  const handleChangeForMeasurement = (e) => {
    setMeasurement(e.target.value)
  }

  const handleChangeForValue = (e) => {
    setValue(e.target.value)
  }

  const handleClear = () => {
    document.getElementById("form1").reset();
    setValue("");
    setMeasurement("");
  }

  const handleDelete = (e,index) => {
    setSampleDesc(sampleDesc => {
                const data = [...sampleDesc.data];

                data.splice(index, 1);
                console.log(data);
                return { ...sampleDesc, data };
              });
  }
  useEffect(() => {
      if (isDescriptorAdded) {
        setIsThereAnySampleDesc(true)
console.log(sampleDesc);
        console.log("anu");
  //      console.log(sampleDesc);
        // setValue("");
        // setMeasurement("");
      }
      setIsDescriptorAdded(false);
    },[isDescriptorAdded]);

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        Add Sample
      </Typography>
    <form className={classes.form} onSubmit={{}}>
      <div style={{marginTop : "20px"}}><TextField
        autoFocus
        id="name"
        label="Sample Name"
        size="small"
        {...name}
        className={classes.nameField}
        type="text"
      /><TextField
        id="sample_type"
        select
        label="Sample Type"
        className={classes.textField1}
        {...sType}
        SelectProps={{
          native: true,
          MenuProps: {
            className: classes.menu,
          },
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
      />
  </div>
      <div style={{marginTop : "20px", width : "56.7%"}}><TextField
        id="standard-multiline-flexible"
        label="Description"
        multiline
        {...description}
        rowsMax="4"
        margin="normal"
        fullWidth
      /></div>
    <form id="form1">
    <div style={{marginTop : "20px"}}>
      <TextField
        id="sample_descriptor"
        select
        label="Sample Descriptor"
        className={classes.textField1}
        {...sDescriptor}
        SelectProps={{
          native: true,
          MenuProps: {
            className: classes.menu,
          },
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
        onChange = {e => handleChangeForValue(e)}
        className={classes.valueField}
        type="text"
      />
      <TextField
        margin="dense"
        className={classes.textField2}
        id="unit_of_measurment"
        onChange = {e => handleChangeForMeasurement(e)}
        label="Measurement Unit"
        type="text"
      />
    <Tooltip title = "Add Sample Descriptor">
    <CheckRoundedIcon className = {classes.tick}
      onClick = {e=>handleAddDescriptor(e)}
      />
  </Tooltip>
  <Tooltip title = "Clear Sample Descriptor Selection">
  <ClearRoundedIcon className = {classes.tick}

    onClick = {handleClear}/>
</Tooltip>

    </div>
  </form>
    <div style={{marginTop : "40px"}}>
      {isThereAnySampleDesc && sampleDesc.data.map((row,index) =>{
        const ret = `${row[0]} :\xa0\xa0   ${row[1]}   \xa0   ${row[2]}`
        console.log("Anybody Here");
        return(
        <div><Chip
          size="medium"
          variant="outlined"
          label={ret}
          onDelete={e => handleDelete(e,index)}
        /></div>)
      })}

    </div>
      <div style={{marginTop : "40px"}}>

      <Button  onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button  type = "submit" onClick={handleClose} color="primary">
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
    menu: {
      width: 200,
    }
  }));
