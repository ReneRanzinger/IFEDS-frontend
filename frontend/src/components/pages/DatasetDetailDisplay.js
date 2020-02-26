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
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



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
  const {name, id, id1, state, handleDropDownChangeChip, classes, list} = props;
  const [data, setData] = useState([]);
  const [initialChip, setInitialChip] = useState(true);

  const handleChange = (e) => {

    if(initialChip) {
      state.map((row) => { if(row[id]) {
       data.push(row[`${id}`])} else {
         data.push(row)
       }}
       )
        setData([...data])
        setInitialChip(false)
    }
    const newValue = e.target.value;
    const temp = list.filter(e => (e.name === newValue))
    console.log(initialChip)
    setData(() => {
                if(data.filter(tempo => tempo["name"] === temp[0]["name"]).length !== 1)
                {
                  data.push(temp[0])
                }
                 return  [...data];
               });
  }

  const handleHeaderChangeForChip = (e, edit , head) => {
    if(initialChip) {
      state.map((row) => { if(row[id]) {
       data.push(row[`${id}`])} else {
         data.push(row)
       }}
       )
        setData([...data])
        setInitialChip(false)

    }
      handleDropDownChangeChip(data, edit, head)
  }

  const handleDelete = (e , index) => {
    if(initialChip) {
      state.map((row) => { if(row[id]) {
       data.push(row[`${id}`])} else {
         data.push(row)
       }}
       )
        setData([...data])
        setInitialChip(false)

    }
    setData(data => {
      const data1 = [...data];
      data1.splice(index,1);
      return [...data1]
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleDropDownChangeChip(data, true)
  }

  return(<div>
    <form onSubmit = {handleSubmit}>
    <EditableHeader
      head = {name}
      edit = 'Save'
      isEditable = {true}
      variant = 'h6'
      handleHeaderChange = {handleHeaderChangeForChip}
       />

    <InputLabel shrink htmlFor="fundingSource">
          {name}
        </InputLabel>
        <NativeSelect
          value={data.name}
          onChange={handleChange}
          inputProps={{
            name: `${name}`,
            id: `${id}`,
          }}
        >
        <option/>
        {list.map(option => (

          <option key={option[`${id1}`]} value={option.name}>
            {option.name}
          </option>
        ))}
        </NativeSelect>
  <div>
    {
      initialChip && state.map((row, index) => {
        let ret;
        if(row[id]) {
        ret = `${row[`${id}`]["name"]}`;}
        else {
         ret = `${row["name"]} `;
        }
        return (
            <Chip
              size="medium"
              variant="outlined"
              label={ret}
              color='primary'
              onDelete={e => handleDelete(e, index)}
            />
        );

      })

    }
  </div>
    <div>
    { data && data.map((row, index) => {
      console.log("ram",row)
      let ret;
      if(row[id]) {
      ret = `${row[`${id}`]["name"]}`;}
      else {
       ret = `${row["name"]} `;
      }
      return (
          <Chip
            size="medium"
            variant="outlined"
            label={ret}
            color='primary'
            onDelete={e => handleDelete(e, index)}
          />
      );

    })
    }
  </div>
</form>
  </div>
  )
}

const EditableDropDownChip1 = props => {
  const {name, id, id1, state, handleDropDownChangeChip, classes, list} = props;
  const [data, setData] = useState([]);
  const [initialChip, setInitialChip] = useState(true);

  const handleChange = (e) => {

    if(initialChip) {
      state.map((row) => {
       data.push(row)}
       )
        setData([...data])
        setInitialChip(false)
    }
    const newValue = e.target.value;
    const temp = list.filter(e => (e.name === newValue))
    setData(() => {
                if(data.filter(tempo => tempo["name"] === temp[0]["name"]).length !== 1)
                {
                  data.push(temp[0])
                }
                 return  [...data];
               });
  }

  const handleHeaderChangeForChip = (e, edit , head) => {
    if(initialChip) {
      state.map((row) =>
       data.push(row)
       )
        setData([...data])
        setInitialChip(false)

    }
      handleDropDownChangeChip(data, edit, head)
  }

  const handleDelete = (e , index) => {
    if(initialChip) {
      state.map((row) =>
       data.push(row)
       )
        setData([...data])
        setInitialChip(false)

    }
    setData(data => {
      const data1 = [...data];
      data1.splice(index,1);
      return [...data1]
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleDropDownChangeChip(data, true)
  }

  return(<div>
    <form onSubmit = {handleSubmit}>
    <EditableHeader
      head = {name}
      edit = 'Save'
      isEditable = {true}
      variant = 'h6'
      handleHeaderChange = {handleHeaderChangeForChip}
       />
    <Divider/>

    <InputLabel shrink htmlFor="fundingSource">
          {name}
        </InputLabel>
        <NativeSelect
          value={data.name}
          onChange={handleChange}
          inputProps={{
            name: `${name}`,
            id: `${id}`,
          }}
        >
        <option/>
        {list.map(option => (

          <option key={option[`${id1}`]} value={option.name}>
            {option.name}
          </option>
        ))}
        </NativeSelect>
  <div>
    {
      initialChip && state.map((row, index) => {
        console.log("State",state)
        const ret = `${row["name"]}`
        return (
            <Chip
              size="medium"
              variant="outlined"
              label={ret}
              color='primary'
              onDelete={e => handleDelete(e, index)}
            />
        );

      })

    }
  </div>
    <div>
    { data && data.map((row, index) => {
      const ret = `${row["name"]}`
      return (
          <Chip
            size="medium"
            variant="outlined"
            label={ret}
            color='primary'
            onDelete={e => handleDelete(e, index)}
          />
      );

    })
    }
  </div>
</form>
  </div>
  )
}

const EditablePublicationDetail = props => {
  const {name, handleDropDownChangeChip} = props;
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [paper, setPaper] = useState();

  const handleChange = (e) => {
    setData(e.target.value)
  }

  const handleHeaderChangeForChip = (e, edit , head) => {

      handleDropDownChangeChip(data, edit, head)
  }

  const handleDelete = (e , index) => {
    setData()
  }

  const handleSubmit = e => {
    e.preventDefault()
  //  handleDropDownChangeChip(data, true)
  }

  const handleSubmit1 = e => {
    e.preventDefault()
    setError(true)
    console.log("anubhav",data)
  }

  return(<div>
    <form onSubmit = {handleSubmit}>
    <EditableHeader
      head = {name}
      edit = 'Save'
      isEditable = {true}
      variant = 'h6'
      handleHeaderChange = {handleHeaderChangeForChip}
       />
    <Divider/>
      <form onSubmit = {handleSubmit1}>
        <TextField
          autoFocus
          error = {!error ? false :  true}
          color = {!error ? "secondary" : "primary"}
          id="paper"
          label="Paper ID"
          helperText = {error ? "Invalid pmid": "Enter pmid"}
          size="small"
          value={data}
          onChange={handleChange}
          type="text"
        />
      <Button variant="outlined" color="primary" type = "submit">
          Check
        </Button>
      </form>


    <div>
    { paper &&
          <Chip
            size="medium"
            variant="outlined"
            label={data.title}
            color='primary'
            onDelete={e => handleDelete(e)}
          />
    }
  </div>
</form>
  </div>
  )
}

const DataExperiment =props =>{
  const{state,name, edit, isEditable, variant, handleHeaderChange}=props;

  return (
    <div>
      <EditableHeader
        head={name}
        isEditable={isEditable}
        edit={edit}
        variant={variant}
        handleHeaderChange = {handleHeaderChange}
       />
      {state && state.map((row,index) => {
        let ret;
        if(row["experimentType"]) {
        ret = `${row["experimentType"]["name"]} `;}
        else {
         ret = `${row["name"]} `;
        }
        return (
          <Chip
            size="medium"
            variant="outlined"
            label={ret}
            color="primary"
            />
        )
      }

      )}
      {!state[0] &&<Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>N/A</Typography>}
    </div>
  );
  }

const DatasetDet = props => {
  const {state, edit, isEditable, handleHeaderChange} = props;

  return (
    <div>
      <EditableHeader head={state.datasetName}  isEditable={isEditable} edit={edit} variant="h6" handleHeaderChange = {handleHeaderChange}/>
      <Divider/>
      <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "18px"}}>{state.description}</Typography>
    </div>

  )
}

const EditableDatasetDet = props => {
  const {state, handleChange,handleDatasetSubmit,classes} = props;

  const handleDatasetSubmit1 = e => {
    e.preventDefault()
    handleDatasetSubmit(e, "Save",  "Dataset")
  }

  return(
    <form onSubmit = {handleDatasetSubmit1}>
    <div style = {{display: "flex", justifyContent: "space-between"}}>
      <TextField
        autoFocus
        required
        id="name"
        label="Dataset Name"
        name="datasetName"
        size="large"
        value={state.datasetName}
        defaultValue={state.datasetName}
        onChange={handleChange}
        className={classes.nameField}
        type="text"
      />
      <Tooltip title="Save" type = "submit">
        <IconButton aria-label="save">
          <SaveIcon />
        </IconButton>
      </Tooltip>
   </div>
       <Divider/>
      <TextField
        multiline
        id="description"
        label="Description"
        name="description"
        rowsMax = "4"
        size="large"
        value={state.description}
        defaultValue={state.description}
        onChange={handleChange}
        fullWidth
        type="text"
        margin="normal"
      /></form>
  )
}

const DataKeyword = props => {
  const{state,name, edit, isEditable, variant, handleHeaderChange}=props;
  console.log("keyword",state)
  return (
    <div>
      <EditableHeader
        head={name}
        isEditable={isEditable}
        edit={edit}
        variant={variant}
        handleHeaderChange = {handleHeaderChange}
         />
      {state &&
        state.map((row, index) => {
          const ret = `${row["name"]} `;
          return (
              <Chip
                size="medium"
                variant="outlined"
                label={ret}
                color="primary"
              />
          );
        })}
        {!state[0] &&<Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>N/A</Typography>}
    </div>
  );
}

const DataFundingSource = props => {
  const{state,name, edit, isEditable, variant, handleHeaderChange}=props;
  return (
    <div>
      <EditableHeader
        head={name}
        isEditable={isEditable}
        edit={edit}
        variant={variant}
        handleHeaderChange = {handleHeaderChange}
         />
      {state &&
        state.map((row, index) => {
          let ret;
          if(row["fundingSource"]) {
          ret = `${row["fundingSource"]["name"]}`;}
          else {
           ret = `${row["name"]} `;
          }
          return (
              <Chip
                size="medium"
                variant="outlined"
                label={ret}
                color="primary"
              />
          );
        })}
        {!state[0] &&<Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>N/A</Typography>}
    </div>
  );
}

const DataPublication = props => {
  const {state,name, edit, isEditable, variant, handleHeaderChange,classes} = props;

  return (
    <div>
      <EditableHeader
        head = {name}
        edit = {edit}
        isEditable = {isEditable}
        variant = {variant}
        handleHeaderChange = {handleHeaderChange} />
      <Divider />
      {state &&
        state.map((row, index) => {
          const ret = `${row["title"]} \xa0\xa0 ${row["authorList"]} \xa0\xa0  ${row["journalName"]} \xa0\xa0  ${row["pmid"]} \xa0\xa0  ${row["url"]}`;
          return (
            <ul>
              <li>
                <Typography variant="subtitle2" className={classes.header}>
                  {ret}
                </Typography>
              </li>
            </ul>
          );
        })}
        {!state[0] &&<Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>N/A</Typography>}
    </div>
  );
};


const DataSample = props => {
  const{state,name, edit, isEditable, variant, handleHeaderChange,classes}=props;

  return (
    <Card className = {classes.bullet}>
      <EditableHeader
        head = {name}
        edit = {edit}
        isEditable = {isEditable}
        variant = {variant}
        handleHeaderChange = {handleHeaderChange}/>
      <Divider />{state && <div>
      {state.name && <div><Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px"}}>Name</Typography>
      <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{state.name}</Typography>
      </div>}
      {state.description && <div><Typography variant = "subtitle2" style = {{color: "#5bc0be",  marginBottom: "0px"}}>Description</Typography>
      <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{state.description}</Typography>
      </div>}
      {state.url && <div><Typography variant = "subtitle2" style = {{color: "#5bc0be" , marginBottom: "0px"}}>URL</Typography>
      <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{state.url}</Typography>
      </div>}
      {state.sampleDescriptors && <div><Typography variant = "subtitle2" style = {{color: "#5bc0be" , marginBottom: "0px"}}>Sample Descriptors</Typography>
      {
        state.sampleDescriptors && state.sampleDescriptors.map((row,index )=> {
          const ret = `${row["sampleDescriptor"]["name"]} :\xa0\xa0 ${row["value"]} \xa0\xa0  ${row["unitOfMeasurement"]}`
          return(
            <Chip
              size="medium"
              variant="outlined"
              label={ret}
              color ="primary"
            />)
        })
      }</div>}
</div>}
  {!state &&<Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>N/A</Typography>}
    </Card>
  );
}

const DataFile = props => {
  const { state, name, variant, classes } = props;

  return (
    <div>
      <EditableHeader head={name} isEditable={false} variant="h6" />
      <Divider />
      {state &&
        state.map((row, index) => {
          const ret = `${row["origFileName"]} \xa0\xa0 ${row["description"]} \xa0\xa0  ${row["size"]} `;
          return (
            <Table
              className={classes.bullet2}
              aria-label="simple table"
              borderColor="#5bc0be"
              borderStyle="solid"
            >
              <TableHead>
                <Typography variant={variant} className={classes.header}>
                  <TableCell> original_file_name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>data_file_size</TableCell>
                  <TableCell>
                    <Button style={{ color: "#5bc0be", marginBottom: "0px" }}>
                      Download
                    </Button>
                  </TableCell>

                  <TableRow>
                    <TableCell> {row["origFileName"]}</TableCell>
                    <TableCell>{row["description"]} </TableCell>
                    <TableCell> {row["size"]}</TableCell>
                  </TableRow>
                </Typography>
              </TableHead>
            </Table>
          );
        })}
    </div>
  );
};



const DatasetDetailDisplay = (props) =>{
  const classes = useToolbarStyles();
  const [editable, setEditable] = useState(false);
  const [editableSample, setEditableSample] = useState(true);
  const [editableExpType, setEditableExpType] = useState(false);
  const [editableKeyword, setEditableKeyword] = useState(false);
  const [editableFundSrc, setEditableFundSrc] = useState(false);
  const [editablePublication, setEditablePublication] = useState(false);
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
const [sample , setSample] = useState({});
const [experimentTypes, setExperimentTypes] = useState([]);
const [keywords, setKeywords] = useState([]);
const [fundingSource, setFundingSource] = useState([]);
const [publications, setPublications] = useState([]);
const [file, setFile] = useState([]);

const sampleEx = props.sample;
const experimentEx = props.experimentType;
const fundingSourceEx = props.fundingSource;
const keywordEx = props.keyword

  const handleChange = e => {
      const name = e.target.name;
      const newValue = e.target.value;
      setDataset({ [name]: newValue });
    };

    const handleChangeForDropDown = (e, name) => {
      const newValue = e.target.value;
      if (name === "sample") {
        const sampleTest = sampleEx.filter(e => (e.name === newValue))
        setSample(sampleTest[0]) }
    }

    const handleDropDownChangeChip = (data, edit) => {
      setExperimentTypes(data)
      handleClick3()
    }

    const handleDropDownChangeChip1 = (data, edit) => {
      setFundingSource(data)
      handleClick5()
    }

    const handleDropDownChangeChip2 = (data, edit) => {
      setKeywords(data)
      handleClick4()
    }

  const handleSampleSubmit = e => {
    setDataset({[sample] : sample})
    setEditableSample(!editableSample)
  }

  const handleHeaderChange = (e, edit, head) =>{
    if (edit === 'Save') {
      if (head === "Sample") {
        handleClick1();
      }
      if(head === `Dataset`){
        handleClick()
      }
    }
    if (edit === 'Edit') {
      if (head === 'Sample') {
        handleClick1();
      }
      if(head === `${dataset.datasetName}`){
        handleClick()
      }
      if(head === 'Experiment Type'){
        handleClick3()
      }
      if(head === "Keyword"){
        handleClick4()
      }
      if(head === "Funding Source"){
        handleClick5()
      }
      if(head === "Publications"){
        handleClick6()
      }
    }
  }

  const handleClick = () => {
    setEditable(!editable)
  }
  const handleClick1 = () => {
    setEditableSample(!editableSample)
  }
  const handleClick3 = () => {
    setEditableExpType(!editableExpType)
  }
  const handleClick4 = () => {
    setEditableKeyword(!editableKeyword)
  }
  const handleClick5 = () => {
    setEditableFundSrc(!editableFundSrc)
  }
  const handleClick6 = () => {
    setEditablePublication(!editablePublication)
  }


  useEffect(() => {
    fetch(`${Dataset}/${params.id}`, {
      method: "GET"
    }).then(response => response.json()).then(res => {
      setDataset(res);
      setProvider(res.provider)
      setSample(res.sample)
      setExperimentTypes(res.experimentTypes)
      setKeywords(res.keywords)
      setFundingSource(res.fundingSources)
      setPublications(res.papers)
      setFile(res.dataFiles)
    }).catch(error => console.log(error));
  }, [params.id]);

return( <Paper className = {classes.root}>
<div style = {{display:"block", width: "66.6%", position: "relative", marginRight: "8px"}}>
    <Card className = {classes.bullet}>

      { !editable ?
        <DatasetDet
          state = {dataset}
          edit = "Edit"
          isEditable = {props.editDataset}
          handleHeaderChange = {handleHeaderChange}/>
        :
        <EditableDatasetDet
          state = {dataset}
          classes = {classes}
          handleChange = {handleChange}
          handleDatasetSubmit = {handleHeaderChange}
          />}
      {!editableExpType ?
        <DataExperiment
          state = {experimentTypes}
          name = {"Experiment Type"}
          edit = {"Edit"}
          isEditable = {props.editDataset}
          variant = "h6"
          handleHeaderChange = {handleHeaderChange}
          />
        :
        <EditableDropDownChip
          id = 'experimentType'
          id1 = 'experimentTypeId'
          name = 'Experiment Type'
          state = {experimentTypes}
          classes = {classes}
          list = {experimentEx}
          handleDropDownChangeChip = {handleDropDownChangeChip}/>
      }
      {!editableKeyword ?
        <DataKeyword
          state = {keywords}
          name = {"Keyword"}
          edit = {"Edit"}
          isEditable = {props.editDataset}
          variant = "h6"
          handleHeaderChange = {handleHeaderChange}
          />
        :
        <EditableDropDownChip1
            id = 'keywords'
            id1 = 'keywordId'
            name = 'Keywords'
            state = {keywords}
            classes = {classes}
            list = {keywordEx}
            handleDropDownChangeChip = {handleDropDownChangeChip2}/>
      }
      {!editableFundSrc ?
        <DataFundingSource
          state = {fundingSource}
          name = {"Funding Source"}
          edit = {"Edit"}
          isEditable = {props.editDataset}
          variant = "h6"
          handleHeaderChange = {handleHeaderChange}
          />
        :
        <EditableDropDownChip
          id = 'fundingSource'
          id1 = 'fundingSourceId'
          name = 'Funding Source'
          state = {fundingSource}
          classes = {classes}
          list = {fundingSourceEx}
          handleDropDownChangeChip = {handleDropDownChangeChip1}/>
      }
</Card>
<Card className = {classes.bullet1}>
  {!editablePublication ?
    <DataPublication
      state = {publications}
      name = "Publications"
      edit = "Edit"
      isEditable = {false}
      variant = "h6"
      classes = {classes}
      handleHeaderChange = {handleHeaderChange}
      /> :
      <EditablePublicationDetail
        name = "Publications"
        handleHeaderChange = {handleHeaderChange}/>

  }
</Card>
<Card className = {classes.bullet1}>
  <DataFile
    state = {file}
    name = "Data File"
    variant = "h6"
    classes = {classes}
    />
</Card>
</div>
<div style = {{display:"block", width: "33.3%", position: "relative", marginLeft: "8px"}}>

{ editableSample ?
  <DataSample
    state = {sample}
    name = {"Sample"}
    edit = {"Edit"}
    isEditable = {props.editDataset}
    variant = "h6"
    classes = {classes}
    handleHeaderChange = {handleHeaderChange}/> :
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

  <Card className = {classes.bullet1}>
    <div >
      <Typography variant = "h6" style = {{color: "green", marginBottom: "0px", paddingTop: "12px"}}>Provider</Typography>
    </div>
    <Divider />
    <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px"}}>Name</Typography>
    <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{provider.name}</Typography>
    { provider.providerGroup && <div>
      <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px"}}>Group</Typography>
      <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{provider.providerGroup}</Typography>
      </div>
    }
    { provider.department && <div>
      <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px"}}>Department</Typography>
      <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{provider.department}</Typography>
      </div>
    }
    { provider.affiliation && <div>
      <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px"}}>Affiliation</Typography>
      <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{provider.affiliation}</Typography>
      </div>
    }
    { provider.url && <div>
      <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px"}}>URL</Typography>
      <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{provider.url}</Typography>
      </div>
    }
    { provider.contact && <div>
      <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px"}}>Contact</Typography>
      <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{provider.contact}</Typography>
      </div>
    }
    { provider.username && <div>
      <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px"}}>Username</Typography>
      <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{provider.username}</Typography>
      </div>
    }
    { provider.email && <div>
      <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px"}}>Email</Typography>
      <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{provider.email}</Typography>
      </div>
    }

  </Card>



</div>
  </Paper>
)


}



const useToolbarStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(2),
    display: "flex",
    position: "relative",
    height: "auto"
  },
  header: {
    marginBottom: "0px",
    paddingTop: "12px"
  },
  bullet: {
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  bullet1: {
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
