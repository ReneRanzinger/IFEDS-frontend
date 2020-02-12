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



const DatasetDetailDisplay = (props) =>{
  const classes = useToolbarStyles();
  const [editable, setEditable] = useState(false);
  const [editableSample, setEditableSample] = useState(false);
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


  const handleChange = e => {
    console.log(e.target.name)
      const name = e.target.name;
      const newValue = e.target.value;
      setDataset({ [name]: newValue });
    };

    const handleChange1 = e => {
      console.log(e.target.name)
        const name = e.target.name;
        const newValue = e.target.value;
        setProvider({ [name]: newValue });
      };


  const handleSubmit = e => {
    setDataset(provider)
    setEditableProvider(!editableProvider)
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
    fetch(`/dataset/${params.id}`, {
      method: "GET"
    }).then(response => response.json()).then(res => {
      setDataset(res);
      setProvider(res.provider)
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
{props.editDataset && <Tooltip title="Save" onClick={handleClick}>
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


<div style = {{display:"flex"}}>
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
    <h4 style = {{color: "#5bc0be", marginBottom: "0px"}}>Name</h4>
    <h4 style={{marginTop: "0px"}}>{dataset.sample.name}</h4>
    <h4 style = {{color: "#5bc0be",  marginBottom: "0px"}}>Description</h4>
    <h4 style={{marginTop: "0px"}}>{dataset.sample.description}</h4>
    <h4 style = {{color: "#5bc0be" , marginBottom: "0px"}}>URL</h4>
    <h4 style={{marginTop: "0px"}}>{dataset.sample.url}</h4>
    <h4 style = {{color: "#5bc0be" , marginBottom: "0px"}}>Sample Descriptors</h4>
    {
      dataset.sample.sampleDescriptors && dataset.sample.sampleDescriptors.map((row,index )=> {
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
    <div style = {{display: "flex", justifyContent: "space-between"}}>
      <h1>Anubhav</h1>
</div>
</Card> }




{ !editableProvider ?
  <Card className={classes.bullet2}>
    <div style = {{display: "flex", justifyContent: "space-between"}}>
    <h3 style={{ color: "green" }}>Provider</h3>
  {props.editDataset && <Tooltip title="Edit" onClick={handleClick2} >
  <IconButton aria-label="edit" >
    <EditIcon />
  </IconButton>
</Tooltip>}
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

  </Card> :

  <Card className = {classes.bullet2}>
    <form onSubmit={handleSubmit}>
    <div style = {{display: "flex", justifyContent: "space-between"}}>
    <h3 style={{ color: "green" }}>Provider</h3>
  {props.editDataset && <Tooltip title="Save" type = "submit" >
  <IconButton aria-label="save" >
    <SaveIcon />
  </IconButton>
</Tooltip>}
    </div>
    <Divider/>
<TextField
  autoFocus
  required
  id="name"
  label="Provider Name"
  name="name"
  size="small"
  value={provider.name}
  defaultValue={provider.name}
  onChange={handleChange1}
  className={classes.nameField}
  type="text"
/>

<TextField
  id="group"
  label="Provider Group"
  name="providerGroup"
  size="small"
  value={provider.providerGroup}
  defaultValue={provider.providerGroup}
  onChange={handleChange1}
  className={classes.nameField}
  type="text"
/>

<TextField
  id="department"
  label="Department"
  name="department"
  size="small"
  value={provider.department}
  defaultValue={provider.department}
  onChange={handleChange1}
  className={classes.nameField}
  type="text"
/>

<TextField
  id="affiliation"
  label="Affiliation"
  name="affiliation"
  size="small"
  value={provider.affiliation}
  defaultValue={provider.affiliation}
  onChange={handleChange1}
  className={classes.nameField}
  type="text"
/>
<TextField
  id="url"
  label="URL"
  name="url"
  size="small"
  value={provider.url}
  defaultValue={provider.url}
  onChange={handleChange1}
  className={classes.nameField}
  type="text"
/>
<TextField
  id="contact"
  label="Contact"
  name="contact"
  size="small"
  value={provider.contact}
  defaultValue={provider.contact}
  onChange={handleChange1}
  className={classes.nameField}
  type="text"
/>
<TextField
  id="username"
  label="Username"
  name="username"
  size="small"
  value={provider.username}
  defaultValue={provider.username}
  onChange={handleChange1}
  className={classes.nameField}
  type="text"
/>
<TextField
  id="email"
  label="Email"
  name="email"
  size="small"
  value={provider.email}
  defaultValue={provider.email}
  onChange={handleChange1}
  className={classes.nameField}
  type="text"
/>

</form>
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
