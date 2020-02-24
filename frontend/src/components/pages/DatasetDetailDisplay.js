import React, {useReducer, useState,useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import SaveIcon from '@material-ui/icons/Save';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import {Dataset} from '../../apiCalls';
import Typography from '@material-ui/core/Typography';


const EditableHeader = props => {
  const classes = useEditableHeaderStyles();
  const {head, edit, isEditable, handleHeaderChange, variant} = props;

  const handleClick = (e, edit) => {
    e.preventDefault();
    handleHeaderChange(e, edit, head)
  }
  return(
    <div className = {classes.root}>
      <Typography variant={variant} className = {classes.header}>
        {head}
      </Typography>
      { isEditable &&
        <Tooltip title={edit} type = 'submit' onClick={e => handleClick(e,edit)} >
          <IconButton aria-label={edit} >
            {edit === "Edit" ? <EditIcon/> : <SaveIcon/>}
          </IconButton>
        </Tooltip>}
    </div>
  )
}

const useEditableHeaderStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  header: {
    color: "green",
    marginBottom: "0px",
    paddingTop: "12px"
  }
}));

const EditableDropDown = props => {
  const {name, state, handleDropDownChange, classes, list} = props;

  const handleChange = (e) => {
    handleDropDownChange(e, name)
  }

  return(
    <TextField
      select
      required
      name={name}
      value={state}
      onChange={handleChange}
      label={name}
      className={classes.textField1}
      SelectProps={{
        native: true,
        MenuProps: {
          className: classes.menu,
        },
      }}
      helperText="Please select sample"
      margin="normal"
    >
      {list.map(option => (

        <option key={option.sampleId} value={option.name}>
          {option.name}
        </option>
      ))}
    </TextField>

  )
}

const EditableDropDownChip = props => {
  const {name, state, handleDropDownChangeChip, classes, list} = props;
  const [data, setData] = useState(state)

  const handleChange = (e) => {
    const newValue = e.target.value;
    const temp = list.filter(e => (e.name === newValue))
    setData(data => {
                const data1 = [...data];
                data1.push(temp);
                return { ...data, data1 };
              });
    // handleDropDownChange(e, name)
  }

  const handleHeaderChangeForChip = (e, edit , head) => {
    handleDropDownChangeChip(data, edit, head)
  }

  const handleDelete = (e , index) => {
    setData(data => {
      const data1 = [...data];
      data1.splice(index,1);
      return {...data, data1}
    })
  }

  return(<div>
    <EditableHeader
      head = {name}
      edit = 'Save'
      isEditable = {true}
      variant = 'h6'
      handleHeaderChange = {handleHeaderChangeForChip}
       />
    <Divider/>
    <TextField
      select
      required
      name={name}
      value={data.name}
      onChange={handleChange}
      label={name}
      className={classes.textField1}
      SelectProps={{
        native: true,
        MenuProps: {
          className: classes.menu,
        },
      }}
      helperText="Please select sample"
      margin="normal"
    >
      {list.map(option => (

        <option key={option.experimentTypeId} value={option.name}>
          {option.name}
        </option>
      ))}
    </TextField>
    { data && data.map((row, index) => {
      console.log("An")
      console.log(row)
      const ret = `${row[0]}`
      return (
          <Chip
            size="medium"
            variant="outlined"
            label={ret}
            onDelete={e => handleDelete(e, index)}
          />
      );

    })


    }
  </div>
  )
}


const EditSample = props => {
  const classes = useSampleStyles();
  const {editableSample, sample, sampleEx} = props;

  return(<div>
    { !editableSample ?
      <Card className={classes.bullet1}>
        <div style = {{display: "flex", justifyContent: "space-between"}}>
        <h3 style={{ color: "green" }}>Sample</h3>
      {props.editDataset && <Tooltip title="Edit" onClick={{}} >
      <IconButton aria-label="edit" >
        <EditIcon />
      </IconButton>
    </Tooltip>}
        </div>
        <Divider />
        <Typography variant="h4" style = {{color: "#5bc0be", marginBottom: "0px"}}>Name</Typography>
        <Typography variant="h4" style={{marginTop: "0px"}}>{sample.name}</Typography>
        <Typography variant="h4" style = {{color: "#5bc0be",  marginBottom: "0px"}}>Description</Typography>
        <Typography variant="h4" style={{marginTop: "0px"}}>{sample.description}</Typography>
        <Typography variant="h4" style = {{color: "#5bc0be" , marginBottom: "0px"}}>URL</Typography>
        <Typography variant="h4" style={{marginTop: "0px"}}>{sample.url}</Typography>
        <Typography variant="h4" style = {{color: "#5bc0be" , marginBottom: "0px"}}>Sample Descriptors</Typography>
        {
          sample.sampleDescriptors && sample.sampleDescriptors.map((row,index )=> {
            const ret = `${row["sampleDescriptor"]["name"]} :\xa0\xa0 ${row["value"]} \xa0\xa0  ${row["unitOfMeasurement"]}`
            return(
              <Chip
                size="medium"
                variant="outlined"
                label={ret}
                color ="primary"
              />)
          })
        }

      </Card> :
      <Card className = {classes.bullet1}>
        <form onSubmit={{}}>
        <div style = {{display: "flex", justifyContent: "space-between"}}>
          <h3 style={{ color: "green" }}>Sample</h3>
          {props.editDataset && <Tooltip title="Save" type = "submit" >
          <IconButton aria-label="save" >
            <SaveIcon />
          </IconButton>
        </Tooltip>}
      </div>
      <Divider/>
          <TextField
            id="sample"
            select
            required
            name="sample"
            value={sample.name}
            onChange={{}}
            label="Sample"
            className={classes.textField1}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select sample"
            margin="normal"
          >
            {sampleEx.map(option => (

              <option key={option.sampleId} value={option.name}>
                {option.name}
              </option>
            ))}
          </TextField>

    </form>
  </Card> }
</div>
  )
}

const useSampleStyles = makeStyles(theme => ({

}));

const DatasetDetailDisplay = (props) =>{
  const classes = useToolbarStyles();
  const [editable, setEditable] = useState(false);
  const [editableSample, setEditableSample] = useState(true);
  const [editableProvider, setEditableProvider] = useState(false);
  //const [provider, setProvider] = useState({});
  const {match: { params }} = props;
//  const [editDataset, setEditDataset] = useState(false)

  const [dataset, setDataset] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      datasetId: '',
      datasetName: '',
      description: '',
      sample: {},
      provider: {},
      experimentTypes: [],
      papers: [],
      keywords: [],
      fundingSources: [],
      dataFiles: []
    }
  );

  const [provider, setProvider] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      providerGroup: '',
      department: '',
      affiliation: '',
      url: '',
      contact: '',
      username: '',
      email: ''
    }
  );

  const handleHeaderChange = (e, edit, head) =>{
    if (edit === 'Save') {
      if (head === "Sample") {
        handleClick1(e);
      }
    }
    if (edit === 'Edit') {
      if (head === 'Sample') {
        handleClick1(e);
      }
    }
  }
/*  const [sample, setSample] =  useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      sample : {}
    }
  );
*/
const [sample , setSample] = useState({});
const [experimentTypes, setExperimentTypes] = useState([]);


const sampleEx = props.sample;
const experiment = props.experimentType;

  const handleChange = e => {
    console.log(e.target.name)
      const name = e.target.name;
      const newValue = e.target.value;
      setDataset({ [name]: newValue });
    };

    const handleChange1 = e => {
        const name = e.target.name;
        const newValue = e.target.value;
        setProvider({ [name]: newValue });
      };

    const handleChangeForDropDown = (e, name) => {
      const newValue = e.target.value;
      if (name === "sample") {
        const sampleTest = sampleEx.filter(e => (e.name === newValue))
        setSample(sampleTest[0]) }
    }

    const handleDropDownChangeChip = (data, edit, head) => {
      setExperimentTypes(data)
    }

  const handleSubmit = e => {
    setDataset({[provider] : provider})
    setEditableProvider(!editableProvider)
  }

  const handleSampleSubmit = e => {
    console.log(sample)
    setDataset({[sample] : sample})
    setEditableSample(!editableSample)
  }

  const handleClick = e => {
    setEditable(!editable)
  }
  const handleClick1 = e => {
    setEditableSample(!editableSample)
  }
  const handleClick2 = e => {
    setEditableProvider(!editableProvider)
  }

  useEffect(() => {
    fetch(`${Dataset}/${params.id}`, {
      method: "GET"
    }).then(response => response.json()).then(res => {
      setDataset(res);
      setProvider(res.provider)
      setSample(res.sample)
      setExperimentTypes(res.experimentTypes)
    //  setEditDataset(props.editDataset)
      console.log()
    }).catch(error => console.log(error));
  }, [params.id]);

  console.log(dataset)
return( <Paper className = {classes.root}>
  { !editable ?
    <Card className={classes.bullet}>
      <div style = {{display: "flex", justifyContent: "space-between"}}>
      <h2 style={{ color: "green" }}>{dataset.datasetName}</h2>
    {props.editDataset && <Tooltip title="Edit" onClick={handleClick} >
    <IconButton aria-label="edit" >
      <EditIcon />
    </IconButton>
  </Tooltip>}
      </div>
      <h3>{dataset.description}</h3>
    </Card> :
    <Card className = {classes.bullet}>
      <div style = {{display: "flex", justifyContent: "space-between"}}>
  <TextField
    autoFocus
    required
    id="name"
    label="Dataset Name"
    name="datasetName"
    size="large"
    value={dataset.datasetName}
    defaultValue={dataset.datasetName}
    onChange={handleChange}
    className={classes.nameField}
    type="text"
  />
{props.editDataset && <Tooltip title="Save" type = "submit">
  <IconButton aria-label="save">
    <SaveIcon />
  </IconButton>
  </Tooltip>}
</div>
  <TextField
    multiline
    id="description"
    label="Description"
    name="description"
    rowsMax = "4"
    size="large"
    value={dataset.description}
    defaultValue={dataset.description}
    onChange={handleChange}
    fullWidth
    type="text"
    margin="normal"
  />
</Card> }
<EditableDropDownChip
  name = 'Experiment Type'
  state = {experimentTypes}
  classes = {classes}
  list = {experiment}
  handleDropDownChangeChip = {handleDropDownChangeChip}/>

<div style = {{display:"flex"}}>

{ editableSample ?
  <Card className={classes.bullet1}>
    <EditableHeader
      head = "Sample"
      edit = {editableSample ? "Edit" : "Save"}
      isEditable = {props.editDataset}
      variant = "h6"
      handleHeaderChange = {handleHeaderChange}/>
    <Divider />
    <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px"}}>Name</Typography>
    <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{sample.name}</Typography>
    <Typography variant = "subtitle2" style = {{color: "#5bc0be",  marginBottom: "0px"}}>Description</Typography>
    <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{sample.description}</Typography>
    <Typography variant = "subtitle2" style = {{color: "#5bc0be" , marginBottom: "0px"}}>URL</Typography>
    <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{sample.url}</Typography>
    <Typography variant = "subtitle2" style = {{color: "#5bc0be" , marginBottom: "0px"}}>Sample Descriptors</Typography>
    {
      sample.sampleDescriptors && sample.sampleDescriptors.map((row,index )=> {
        const ret = `${row["sampleDescriptor"]["name"]} :\xa0\xa0 ${row["value"]} \xa0\xa0  ${row["unitOfMeasurement"]}`
        return(
          <Chip
            size="medium"
            variant="outlined"
            label={ret}
            color ="primary"
          />)
      })
    }

  </Card> :
  <Card className = {classes.bullet1}>
    <form onSubmit={handleSampleSubmit}>
      <EditableHeader
        head = "Sample"
        edit = {editableSample ? "Edit" : "Save"}
        isEditable = {props.editDataset}
        variant = "h6"
        handleHeaderChange = {handleHeaderChange}/>
  <Divider/>
      <EditableDropDown
        name="sample"
        state={sample.name}
        classes = {classes}
        list= {sampleEx}
        handleDropDownChange = {handleChangeForDropDown}/>


</form>
</Card> }




{ !editableProvider &&
  <Card className={classes.bullet2}>
    <div style = {{display: "flex", justifyContent: "space-between"}}>
    <h3 style={{ color: "green" }}>Provider</h3>
    </div>
    <Divider />
    <h4 style = {{color: "#5bc0be", marginBottom: "0px"}}>Name</h4>
    <h4 style={{marginTop: "0px"}}>{provider.name}</h4>
    { provider.providerGroup && <div>
      <h4 style = {{color: "#5bc0be", marginBottom: "0px"}}>Group</h4>
      <h4 style={{marginTop: "0px"}}>{provider.providerGroup}</h4>
      </div>
    }
    { provider.department && <div>
      <h4 style = {{color: "#5bc0be", marginBottom: "0px"}}>Department</h4>
      <h4 style={{marginTop: "0px"}}>{provider.department}</h4>
      </div>
    }
    { provider.affiliation && <div>
      <h4 style = {{color: "#5bc0be", marginBottom: "0px"}}>Affiliation</h4>
      <h4 style={{marginTop: "0px"}}>{provider.affiliation}</h4>
      </div>
    }
    { provider.url && <div>
      <h4 style = {{color: "#5bc0be", marginBottom: "0px"}}>URL</h4>
      <h4 style={{marginTop: "0px"}}>{provider.url}</h4>
      </div>
    }
    { provider.contact && <div>
      <h4 style = {{color: "#5bc0be", marginBottom: "0px"}}>Contact</h4>
      <h4 style={{marginTop: "0px"}}>{provider.contact}</h4>
      </div>
    }
    { provider.username && <div>
      <h4 style = {{color: "#5bc0be", marginBottom: "0px"}}>Username</h4>
      <h4 style={{marginTop: "0px"}}>{provider.username}</h4>
      </div>
    }
    { provider.email && <div>
      <h4 style = {{color: "#5bc0be", marginBottom: "0px"}}>Email</h4>
      <h4 style={{marginTop: "0px"}}>{provider.email}</h4>
      </div>
    }

  </Card>


 }

</div>
  </Paper>
)


}



const useToolbarStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(2)
  },
  bullet: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  bullet1: {
    width:"70%",
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  bullet2: {
    width:"30%",
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  textField1 :{
    marginRight: theme.spacing(15)
  },
  textField2 :{
    marginTop: theme.spacing(2.3)
  },
  nameField :{
    width: "90%",
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

export default DatasetDetailDisplay
