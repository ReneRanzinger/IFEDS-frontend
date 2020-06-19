import React, {useReducer, useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import SaveIcon from '@material-ui/icons/Save';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import {Dataset, PaperID, DataFiles} from '../../apiCalls';
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import {GetApp} from '@material-ui/icons'
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";



const EditableHeader = props => {
  const classes = useEditableHeaderStyles();
  const {head, edit, isEditable, handleHeaderChange, variant} = props;

  const handleClick = (e, edit) => {
    e.preventDefault();
    handleHeaderChange(e, edit, head)
  }
  return(
    <div className = {classes.root}>
      <Typography variant={variant} className = {variant === "h6" ?classes.header : classes.header1}>
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
  },
  header1: {
    color: "#5bc0be",
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
      variant = 'subtitle2'
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
      variant = 'subtitle2'
      handleHeaderChange = {handleHeaderChangeForChip}
       />

    <InputLabel shrink htmlFor="fundingSource">
          {name}
        </InputLabel>
        <NativeSelect
          value={data.name}
          onChange={handleChange}
          variant = 'filled'
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
  const {name, state,handleDropDownChangeChip, edit, isEditable, variant,classes} = props;
  const [isPaperAdded,setIsPaperAdded] = useState(state.data ? true : false);
  const [paperData, setPaperData]  = useReducer(
    (state, newState) => ({ ...state, ...newState }), { })
  const [paperDataTotal, setPaperDataTotal] = useState(state)
  const [error, setError] = useState(false)



  const handleHeaderChangeForChip = (e, edit , head) => {
      e.preventDefault()
      handleDropDownChangeChip(paperDataTotal, edit, head)
  }

  const handleDelete = (e , index) => {
    setPaperDataTotal(paper => {
                const data = [...paperDataTotal.data];
                data.splice(index, 1);
                return { ...paperDataTotal, data };
              });
    if (paperDataTotal.data.length === 1) {
      setIsPaperAdded(false)
      }
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleDropDownChangeChip(paperDataTotal, true, name)
  }


  const handleChange1 = e => {
      const name = e.target.name;
      const newValue = e.target.value;
      setPaperData({ [name]: newValue });
      setError(false)
    };

    const handleAdd = e => {
        e.preventDefault()
        console.log("paperData",paperData)
        fetch(`${PaperID}/${paperData.paper}`, {
          method: "GET",
          mode: 'cors',
          headers: setAuthorizationHeader(props.isAuthenticated)
        }).then(response => {
          if (response.status === 500 || response.status === 404 || response.status === 400){
            setError(true)
          }
          return response.json()
        }).then(res => {
          console.log("res",res)
            if (res.status === 500 || res.status === 404 || res.status === 400){
              setError(true)
            }
              else {let count=false;
              setPaperDataTotal(paperDataTotal => {
                const data = [...paperDataTotal.data]
                for (var i = 0; i < paperDataTotal["data"].length; i++) {
                  console.log("paperDataTotal",paperDataTotal)
                if (paperDataTotal["data"][i][0] === res.pmid ) {
                  count = true;
                  break;
                }
              }
              if(!count) {
                data.push([res]);
              }
                return {...paperDataTotal , data}
              });
              setIsPaperAdded(true);
              setPaperData({'paper' : ''})}
        }).catch(error => console.log(error));

      }

      return(<div>
        <form onSubmit = {handleSubmit}>
          <EditableHeader
            head = {name}
            edit = {edit}
            isEditable = {isEditable}
            variant = {variant}
            handleHeaderChange = {handleHeaderChangeForChip}
             />
           <Divider/>
            <TextField
              id="paper"
              name = "paper"
              label="Paper ID"
              error = {error === true ? true :false}
              className={classes.textField1 }
              value = {paperData.paper}
              onChange = {handleChange1}
              helperText={error === true ? " Paper with given pubmed id not found/valid " : "Please type Paper ID"}
              margin="normal"
            />
            <Button className = {classes.button1} color="primary" variant="contained" onClick={e => handleAdd(e)}>
                Add Paper Id
            </Button>
              {isPaperAdded && <div className = {classes.submain}>
                <Divider className = {classes.divider}/>{paperDataTotal.data.map((row, index) => {

                return (
                  <ul>
                    <li>
                      <Typography variant="subtitle2" >
                        {row[0]["title"]}
                      </Typography>
                    <Typography variant="body2" >
                      {`Author:\xa0\xa0 ${row[0]["authorList"]}`}
                    </Typography>
                    <Typography variant="body2" >
                      {`PMID:\xa0\xa0 ${row[0]["pmid"]}`}
                    </Typography>
                    </li>
                  </ul>
                );
              })}
              <Divider className = {classes.submain}/></div>}
        <div >
        </div>
      </form>
      </div>)
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
      {!Object.entries(state).length > 0 &&<Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>N/A</Typography>}
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
        {!Object.entries(state).length > 0 &&<Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>N/A</Typography>}
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
        {!Object.entries(state).length > 0 &&<Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>N/A</Typography>}
    </div>
  );
}

const DataPublication = props => {
  const {state,name, edit, isEditable, variant, handleHeaderChange} = props;
  return (
    <div>
      <EditableHeader
        head = {name}
        edit = {edit}
        isEditable = {isEditable}
        variant = {variant}
        handleHeaderChange = {handleHeaderChange} />
      <Divider />
      {state.data &&
        state.data.map((row, index) => {


          return (
            <ul>
              <li>
                <Typography variant="subtitle2" >
                  {row[0]["title"]}
                </Typography>
              <Typography variant="body2" >
                {`Author:\xa0\xa0 ${row[0]["authorList"]}`}
              </Typography>
              <Typography variant="body2" >
                {`PMID:\xa0\xa0 ${row[0]["pmid"]}`}
              </Typography>
              </li>
            </ul>
          );
        })}
        {!Object.entries(state.data).length > 0 &&<Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>N/A</Typography>}
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

const DataTable = props => {
  const {data} = props
  let bearer = 'Bearer '
  // const [file,setFile] = useReducer(
  //   (state, newState) => ({ ...state, ...newState }), {
  //   state : data })
  // console.log("anu",file)
  const isAuthenticated = useSelector(state => state.user.token);

  const handleDownload = (e,row) => {
    e.preventDefault()
    fetch(`${DataFiles}/${row.dataFileId}`, {
      method: "GET",
      mode: 'cors',
      headers: {"Content-Type": "application/octet-stream","Content-Disposition": "attachment", 'Authorization': bearer+isAuthenticated}
    }).then(response => response.json()).then(res => {
      console.log(res)
      // if (res.status === 401) {
      //   props.props.logout();
      // }
      // setFile((prevState) => {
      //           const data = [...prevState.data];
      //           data.splice(data.indexOf(oldData), 1);
      //           return { ...prevState, data };
      //         });
    }).catch(error => {
      console.log(error)
    });

  }

  const fetchDelete = (oldData, isAuthenticated, props) => {
    fetch(`${DataFiles}/${oldData.dataFileId}`, {
      method: "DELETE",
      mode: 'cors',
      headers: setAuthorizationHeader(isAuthenticated)
    }).then(response => response.json()).then(res => {
      // if (res.status === 401) {
      //   props.props.logout();
      // }
      // setFile((prevState) => {
      //           const data = [...prevState.data];
      //           data.splice(data.indexOf(oldData), 1);
      //           return { ...prevState, data };
      //         });
    }).catch(error => {
      console.log(error)
    });
  }

  const headCells = [
    {
      field: 'origFileName',
      title: 'File Name'
    }, {
      field: 'size',
      title: 'File Size',
      searchable: false
    }, {
      field: 'description',
      title: 'Description',
      sorting: false,
      searchable: false
    }
  ];

return (
  <MaterialTable
    columns={headCells}
    data={data.data}
    localization={{
      header: {
          actions: 'Actions'
      }
        }}
    actions={[
      {
        icon: GetApp,
        tooltip: "Download",
        onClick: (event, rowData) => {
          handleDownload(event, rowData)
        }
      }
    ]}
    editable={{
      onRowDelete: oldData =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve();
            fetchDelete(oldData, isAuthenticated, props);
          }, 300);
        })
    }}
    options={{
       actionsColumnIndex: -1
     }}
    components={{
      Toolbar: props => (
        <div/>
      )
    }} />
)

}



const DataFile = props => {
  const { state, name, variant, classes } = props;
  console.log("state",state)

  return (
    <div>
      <EditableHeader head={name} isEditable={false} variant="h6" />
      <Divider />
      <div style = {{marginBottom : "12px"}}/>
      {state && (<DataTable data = {state}/>)}
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
  const isAuthenticated = useSelector(state => state.user.token);
  const sidebar = useSelector(state => state.sidebar);
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
const [publications, setPublications] = useState({data: []});
const [file, setFile] = useState({data: []});

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

    const handleDropDownChangeChip3 = (data, edit) => {
      setPublications(data)
      handleClick6()
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
      if(head === "Publications") {
        handleClick6()
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
      method: "GET",
      headers: setAuthorizationHeader(isAuthenticated)
    }).then(response => response.json()).then(res => {
      setDataset(res);
      setProvider(res.provider)
      setSample(res.sample)
      setExperimentTypes(res.experimentTypes)
      setKeywords(res.keywords)
      setFundingSource(res.fundingSources)
      setPublications({ data : res.papers})
      setFile({data : res.dataFiles})
    }).catch(error => console.log(error));
  }, [params.id]);

return( <div className = {sidebar ? classes.root1 : classes.root}>
<div style = {{display:"block", width: "66.6%", position: "relative", marginRight: "8px"}}>
    <Card className = {classes.bullet} variant="outlined">

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
          variant = "subtitle2"
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
          variant = "subtitle2"
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
          variant = "subtitle2"
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
      isEditable = {props.editDataset}
      variant = "h6"
      classes = {classes}
      handleHeaderChange = {handleHeaderChange}
      /> :
      <EditablePublicationDetail
        name = "Publications"
        state = {publications}
        classes = {classes}
        edit = "Save"
        isEditable = {props.editDataset}
        variant = "h6"
        handleDropDownChangeChip = {handleDropDownChangeChip3}
        isAuthenticated = {isAuthenticated}/>

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
</div>
)


}

const drawerWidth = 240;

const useToolbarStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(2),
    display: "flex",
    position: "relative",
    height: "auto",
    backgroundColor : "#ebf0ec",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  root1: {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(2),
    display: "flex",
    position: "relative",
    height: "auto",
    backgroundColor : "#ebf0ec",
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  header: {
    marginBottom: "0px",
    paddingTop: "12px"
  },
  bullet: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    border: "groove",
    boxShadow: "none"
  },
  bullet1: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    border: "groove",
    boxShadow: "none"
  },
  bullet2: {
    width: "30%",
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  textField1: {
    marginRight: theme.spacing(15)
  },
  textField2: {
    marginTop: theme.spacing(2.3)
  },
  nameField: {
    width: "90%",
    marginTop: theme.spacing(2.3),
    marginRight: theme.spacing(15)
  },
  valueField: {
    marginTop: theme.spacing(2.3),
    marginRight: theme.spacing(11)
  },
  tick: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(15)
  },
  label: {
    marginLeft: theme.spacing(3),
    paddingTop: theme.spacing(5)
  },
  button1: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3)
  },
  menu: {
    width: 200
  }
}));

export default DatasetDetailDisplay
