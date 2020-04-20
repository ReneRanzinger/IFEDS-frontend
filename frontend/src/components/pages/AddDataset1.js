import React, {useState,useEffect, useReducer} from 'react';
import {useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import {ExperimentType, FundingSource, Keyword, PaperID, SampleData, Datasets} from '../../apiCalls'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    width: '97%',
    marginLeft: theme.spacing(2),
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  root1: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: theme.spacing(32),
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  submain: {
    marginTop: theme.spacing(3)
  },
  data: {
    display: "flex"
  },
  data1: {
    marginRight: "auto"
  },
  url : {
    width: "75%"
  },
  url1: {
    width: "50%"
  },
  experiment : {
    marginTop: theme.spacing(0)
  },
  chip : {
    marginRight: theme.spacing(2)
  },
  button: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  divider: {
    marginBottom: theme.spacing(2)
  },
  button1: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3)
  },
  button2: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(4)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

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


const StepBottom = props => {
  const handleBack1 = () => {
    props.handleBack()
  }

  return (
    <div>
      <Button color="primary" variant="contained" disabled={props.activeStep === 0} onClick={handleBack1} className={props.classes.button}>
        Back
      </Button>
      <Button
        variant="contained"
        color="primary"
        type = "submit"
        className={props.classes.button}
      >
        {props.activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </div>
  )
}

const DatasetDet = props => {
  const [dataset1 , setDataset1] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: props.dataset.name,
      description: props.dataset.description,
      isPublic: props.dataset.isPublic ? true : false
    }
  )

  const handleSubmit = e => {
    e.preventDefault();
    props.handleDatasetSubmit(dataset1.name,dataset1.description,dataset1.isPublic)
    props.handleNext()
  }

  const handleChangeSwitch = e => {
    setDataset1({"isPublic" : !dataset1.isPublic})
  }

  const handleChange = e => {
    const name = e.target.name;
    const newValue = e.target.value;
    setDataset1({ [name]: newValue });
  }

  return(
    <form onSubmit = {handleSubmit}>
      <div className = {props.classes.step}>
        <div className = {props.classes.data}>
      <TextField
        autoFocus
        required
        id="name"
        className = {props.classes.data1}
        defaultValue= {props.dataset.name}
        label="Dataset Name"
        name="name"
        size="large"
        value = {dataset1.name}
        onChange = {handleChange}
        type="text"
      />

      <FormControlLabel
            value="start"
            control={<Switch
                checked={dataset1.isPublic}
                onChange={handleChangeSwitch}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />}
            label="Is Dataset Public ?"
            labelPlacement="start"
            className = {props.classes.data1}
          />

  </div>
      <TextField
        multiline
        id="description"
        label="Description"
        name="description"
        rowsMax = "4"
        defaultValue={props.dataset.description}
        size="large"
        value = {dataset1.description}
        onChange = {handleChange}
        fullWidth
        type="text"
        margin="normal"
        className = {props.classes.url}
      />
    <StepBottom {...props}
      />
</div></form>
  )
}

const Sample = props => {
  const [data, setData] = useState(props.sampleData);

  const handleSubmit = e => {
    e.preventDefault();
    props.handleSampleSubmit(data)
    props.handleNext()
  }

  const handleChange = e => {
    e.preventDefault();
    setData(e.target.value)
  }

  return (
    <div>
      <form onSubmit = {handleSubmit}>
      <InputLabel shrink htmlFor="sample">
            Sample
          </InputLabel>
          <NativeSelect
            value={data}
            onChange={handleChange}
            inputProps={{
              name: 'sample',
              id: 'sample',
            }}
          >
          <option/>
          {props.sample.map(option => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
          </NativeSelect>
          <StepBottom {...props} />
  </form>
</div>
  )
}

const Experiment = props => {
  const [isExpAdded,setIsExpAdded] = useState(props.experiment.data[0] ? true : false);
  const [expData, setExpData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),{ })

  const [expDataTotal, setExpDataTotal] = useState(props.experiment)

  const handleSubmit = e => {
    e.preventDefault();
    props.handleExperimentSubmit(expDataTotal)
    props.handleNext()
  }

  const handleDelete = (e,index) => {
    setExpDataTotal(exp => {
                const data = [...expDataTotal.data];
                data.splice(index, 1);
                return { ...expDataTotal, data };
              });
    if (expDataTotal.data.length === 1) {
      setIsExpAdded(false)
    }
  }

  const handleChange1 = e => {
      const name = e.target.name;
      const newValue = e.target.value;
      setExpData({ [name]: newValue });
    };

    const handleAdd = e => {
      e.preventDefault()
      let count=false;
      setExpDataTotal(expDataTotal => {
        const data = [...expDataTotal.data]
        for (var i = 0; i < expDataTotal["data"].length; i++) {
        if (expDataTotal["data"][i][0] === expData.exp ) {
          count = true;
          break;
        }
      }
      if(!count) {
        if(expData.description!= null) {
        data.push([expData.exp, expData.description]);
      } else {
        data.push([expData.exp, ""]);
      }}
        return {...expDataTotal , data}
      });
      setIsExpAdded(true);
      setExpData({"exp" : '' , "description" : ''})
    }

  return(<div>
    <form name = "exp_form" onSubmit = {handleSubmit}>
      <div className = {props.classes.experiment}>
        <TextField
          id="experiment_type"
          select
          name = "exp"
          label="Experiment Type"
          className={{/*classes.textField1 */}}
          value = {expData.exp}
          onChange = {handleChange1}
          SelectProps={{
            native: true,
            MenuProps: {
              className: {/*classes.menu*/}
            }
          }}
          helperText="Please select Experiment Type"
          margin="normal"
        >
          <option value="" />
          {props.experimentType.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </TextField>
      </div>
      <div>
        <TextField
          multiline
          id="description"
          label="Description"
          name="description"
          rowsMax = "4"
          size="large"
          fullWidth
          value = {expData.description}
          type="text"
          margin="normal"
          onChange={e => handleChange1(e)}
          className={props.classes.url1}
        />

      <Button className = {props.classes.button1} color="primary" variant="contained" onClick={e => handleAdd(e)}>
          Add Experiment Type
      </Button>
        <div>
        {isExpAdded && <div className = {props.classes.submain}>
          <Divider className = {props.classes.divider}/>{expDataTotal.data.map((row, index) => {
          const ret = `${row[0]} `;
          return (

              <Chip
                size="medium"
                color="primary"
                label={ret}
                onDelete={e => handleDelete(e, index)}
                className = {props.classes.chip}
              />

          );
        }) }
      <Divider className = {props.classes.submain}/></div>}
      </div>
      </div>
      <div >
        <StepBottom {...props} />
      </div>
    </form>
    </div>)
}

const Funding = props => {
  const [isFundingAdded,setIsFundingAdded] = useState(props.funding.data[0] ? true : false);
  const [fundData, setFundData]  = useReducer(
    (state, newState) => ({ ...state, ...newState }),{ })

  const [fundDataTotal, setFundDataTotal] = useState(props.funding)

  const handleSubmit = e => {
    e.preventDefault();
    props.handleFundingSubmit(fundDataTotal)
    props.handleNext()
  }

  const handleDelete = (e,index) => {
    setFundDataTotal(fund => {
                const data = [...fundDataTotal.data];
                data.splice(index, 1);
                return { ...fundDataTotal, data };
              });
    if (fundDataTotal.data.length === 1) {
        setIsFundingAdded(false)
    }
  }

  const handleChange1 = e => {
      const name = e.target.name;
      const newValue = e.target.value;
      setFundData({ [name]: newValue });
    };

    const handleAdd = e => {
      e.preventDefault()
      let count=false;
      setFundDataTotal(fundDataTotal => {
        const data = [...fundDataTotal.data]
        for (var i = 0; i < fundDataTotal["data"].length; i++) {
        if (fundDataTotal["data"][i][1] === fundData.grant) {
          count = true;
          break;
        }
      }
      if(!count) {
        if(fundData.url!= null) {
        data.push([fundData.fund, fundData.grant, fundData.url]);
      } else {
        data.push([fundData.fund , fundData.grant, ""]);
      }}
        return {...fundDataTotal , data}
      });
      setIsFundingAdded(true);
      setFundData({'fund' : '', 'grant' : '', 'url' : ''})
    }

  return(<div>
    <form onSubmit = {handleSubmit}>
      <div className = {props.classes.data}>
        <TextField
          id="funding_type"
          select
          name = "fund"
          label="Funding Source"
          className={props.classes.data1}
          value = {fundData.fund}
          onChange = {handleChange1}
          SelectProps={{
            native: true,
            MenuProps: {
              className: {/*classes.menu*/}
            }
          }}
          helperText="Please select Funding Source"
          margin="normal"
        >
          <option value="" />
          {props.fundingSource.map(option => (
            <option key={option.fundingSourceId} value={option.name}>
              {option.name}
            </option>
          ))}
        </TextField>

        <TextField
          id="grant_no"
          label="Grant Number"
          name="grant"
          size="large"
          value = {fundData.grant}
          type="text"
          margin="normal"
          onChange={e => handleChange1(e)}
          className={props.classes.data1}
        />
    </div>
        <TextField
          id="url"
          label="URL"
          name="url"
          rowsMax = "4"
          size="large"
          fullWidth
          value = {fundData.url}
          type="text"
          margin="normal"
          onChange={e => handleChange1(e)}
          className={props.classes.url1}
        />
        <Button className = {props.classes.button1} color="primary" variant="contained" onClick={e => handleAdd(e)}>
            Add Funding Source
        </Button>
        <div>
        {isFundingAdded && <div className = {props.classes.submain}>
          <Divider className = {props.classes.divider}/>
            {fundDataTotal.data.map((row, index) => {
            const ret = `${row[0]} :\xa0\xa0   ${row[1]} `;
            return (
                <Chip
                  size="medium"
                  color="primary"
                  label={ret}
                  onDelete={e => handleDelete(e, index)}
                  className = {props.classes.chip}
                />
            );
          })}
          <Divider className = {props.classes.submain}/></div>}
          </div>
    <div >
      <StepBottom {...props} />
    </div>
  </form>
  </div>
  )
}

const Keywords = props => {
  const [isKeywordAdded,setIsKeywordAdded] = useState(props.funding.data[0] ? true : false);
  const [keywordData, setKeywordData]  = useReducer(
    (state, newState) => ({ ...state, ...newState }), { })
  const [keywordDataTotal, setKeywordDataTotal] = useState(props.keywords)

  const handleSubmit = e => {
    e.preventDefault();
    props.handleKeywordSubmit(keywordDataTotal)
    props.handleNext()
  }

  const handleDelete = (e,index) => {
    setKeywordDataTotal(fund => {
                const data = [...keywordDataTotal.data];
                data.splice(index, 1);
                return { ...keywordDataTotal, data };
              });
    if (keywordDataTotal.data.length === 1) {
      setIsKeywordAdded(false)
      }
  }

  const handleChange1 = e => {
      const name = e.target.name;
      const newValue = e.target.value;
      setKeywordData({ [name]: newValue });
    };

    const handleAdd = e => {
      e.preventDefault()
      let count=false;
      setKeywordDataTotal(keywordDataTotal => {
        const data = [...keywordDataTotal.data]
        for (var i = 0; i < keywordDataTotal["data"].length; i++) {
        if (keywordDataTotal["data"][i][0] === keywordData.keyword ) {
          count = true;
          break;
        }
      }
      if(!count) {
        data.push([keywordData.keyword]);
      }
        return {...keywordDataTotal , data}
      });
      setIsKeywordAdded(true);
    }

  return(<div>
    <form onSubmit = {handleSubmit}>
      <div className = {props.classes.data}>
        <TextField
          id="funding_type"
          select
          name = "keyword"
          label="Keywords"
          value = {keywordData.keyword}
          onChange = {handleChange1}
          SelectProps={{
            native: true,
            MenuProps: {
              className: {/*classes.menu*/}
            }
          }}
          helperText="Please select Keywords"
          margin="normal"
        >
          <option value="" />
          {props.keyword.map(option => (
            <option key={option.keywordId} value={option.name}>
              {option.name}
            </option>
          ))}
        </TextField>
        <Button className = {props.classes.button2} color="primary" variant="contained" onClick={e => handleAdd(e)}>
            Add Keywords
        </Button>
    </div>
        <div>
          {isKeywordAdded && <div className = {props.classes.submain}>
            <Divider className = {props.classes.divider}/>{keywordDataTotal.data.map((row, index) => {
            console.log("yes",row)
            const ret = `${row[0]} `;
            return (
                <Chip
                  size="medium"
                  color="primary"
                  label={ret}
                  onDelete={e => handleDelete(e, index)}
                  className = {props.classes.chip}
                />);
          })}
          <Divider className = {props.classes.submain}/></div>}
          </div>
      <div >
        <StepBottom {...props} />
      </div>
  </form>
  </div>)
}

const Papers = props => {
  const [isPaperAdded,setIsPaperAdded] = useState(props.papers.data[0] ? true : false);
  const [paperData, setPaperData]  = useReducer(
    (state, newState) => ({ ...state, ...newState }), { })
  const [paperDataTotal, setPaperDataTotal] = useState(props.papers)

  const handleSubmit = e => {
    e.preventDefault();
    props.handlePaperSubmit(paperDataTotal)
    props.handleNext()
  }

  const handleDelete = (e,index) => {
    setPaperDataTotal(paper => {
                const data = [...paperDataTotal.data];
                data.splice(index, 1);
                return { ...paperDataTotal, data };
              });
    if (paperDataTotal.data.length === 1) {
      setIsPaperAdded(false)
      }
  }

  const handleChange1 = e => {
      const name = e.target.name;
      const newValue = e.target.value;
      setPaperData({ [name]: newValue });
    };

  const handleAdd = e => {
      e.preventDefault()
      let count=false;
      setPaperDataTotal(paperDataTotal => {
        const data = [...paperDataTotal.data]
        for (var i = 0; i < paperDataTotal["data"].length; i++) {
        if (paperDataTotal["data"][i][0] === paperData.paper ) {
          count = true;
          break;
        }
      }
      if(!count) {
        data.push([paperData.paper]);
      }
        return {...paperDataTotal , data}
      });
      setIsPaperAdded(true);
      setPaperData({'paper' : ''})
    }

  return(<div>
    <form onSubmit = {handleSubmit}>
        <TextField
          id="paper"
          name = "paper"
          label="Paper ID"
          className={{/*classes.textField1 */}}
          value = {paperData.paper}
          onChange = {handleChange1}
          helperText="Please type Paper ID"
          margin="normal"
        />
        <Button className = {props.classes.button1} color="primary" variant="contained" onClick={e => handleAdd(e)}>
            Add Paper Id
        </Button>
          {isPaperAdded && <div className = {props.classes.submain}>
            <Divider className = {props.classes.divider}/>{paperDataTotal.data.map((row, index) => {
            const ret = `${row[0]} `;
            return (
                <Chip
                  size="medium"
                  color="primary"
                  label={ret}
                  onDelete={e => handleDelete(e, index)}
                  className = {props.classes.chip}
                />
            );
          })}
          <Divider className = {props.classes.submain}/></div>}
    <div >
      <StepBottom {...props} />
    </div>
  </form>
  </div>)
}

const Review = props => {
  console.log("reviewq", props)
  const [data, setData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      dataset: props.dataset,
      sample: props.sampleData,
      experiment: props.experiment,
      funding: props.funding,
      keywords: props.keywords,
      papers: props.papers
    }
  )

  async function handleSubmit (e)  {
    e.preventDefault();
    console.log("pr", props)
    let expType = data.experiment.data.map((row, index) => {
      let expId = props.experimentType.filter(x => x["name"] === row[0])[0]["experimentTypeId"]
      let expArray = {
        "experiment_type_id" : expId,
        "description" : row[1]
      }
      return expArray
    })
    let funding = data.funding.data.map((row, index) => {
      let fundId = props.fundingSource.filter(x => x["name"] === row[0])[0]["fundingSourceId"]
      let fundArray = {
        "funding_source_id" : fundId,
        "grant_number" : row[1],
        "url" : row[2]
      }
      return fundArray
    })
    let keyword = data.keywords.data.map((row, index) => {
      let keywordId = props.keyword.filter(x => x["name"] === row[0])[0]["keywordId"]

      return keywordId
    })
    let paper = data.papers.data.map((row, index) => {
      return parseInt(row[0])
    })

    let sampleId = props.sample.filter(x => x["name"] === data.sample)[0]["sampleId"]

    const response =  await fetch(Datasets,{
       method: "POST",
       mode: 'cors',
       headers: setAuthorizationHeader(props.isAuthenticated),
       body: JSON.stringify({
            "datasetName": data.dataset.name,
            "description": data.dataset.description,
            "experiment_types": expType,
            "funding_grant": funding,
            "is_public": data.dataset.isPublic,
            "keywordsIds": keyword,
            "paperIds": paper,
            "sampleIds": sampleId
       })
     }).then(res => console.log(res))
    props.handleFinish()

  }


  return(
    <Paper >
      <form onSubmit = {handleSubmit}>
      <div >
        <Typography variant = "h6" style = {{color: "green", marginBottom: "0px", paddingTop: "12px"}}>Add Dataset Review</Typography>
      </div>
      <Divider />
        { data.dataset && <div>
          <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px"}}>Name</Typography>
          <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{data.dataset.name}</Typography>
          </div>
        }
        { data.dataset && <div>
          <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px"}}>Is Dataset Public</Typography>
          <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{data.dataset.isPublic ? "Yes" : "No"}</Typography>
          </div>
        }
      { data.dataset && <div>
        <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px"}}>Description</Typography>
        {data.dataset.description ? <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{data.dataset.description}</Typography>
      :<Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>N/A</Typography>}
        </div>
      }
      <Divider />
      <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px", paddingTop: "12px"}}>Sample</Typography>
        {data.sample ? <div style = {{marginTop: "0px",marginBottom: "12px"}}><Chip
            size="medium"
            variant="outlined"
            label={data.sample}
          /> </div>: <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>N/A</Typography>}
      <Divider />
      <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px", paddingTop: "12px"}}>Experiment Types</Typography>
        {data.experiment.data ? data.experiment.data.map((row,index) => {return(<div>
          <Typography variant = "subtitle2" fontWeight="fontWeightBold" style={{marginTop: "0px"}}>{`Name : \xa0 ${row[0]}`}</Typography>
          {row[1] ? <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{`Description : \xa0 ${row[1]}`}</Typography> : <Typography style={{marginTop: "0px",marginBottom: "12px"}}/>}
        </div>)}) :
      <Typography variant = "subtitle2"  style={{marginTop: "0px",marginBottom: "12px"}}>N/A</Typography>}
      <Divider/>
        <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px", paddingTop: "12px"}}>Funding Source</Typography>
          {data.funding.data ? data.funding.data.map((row,index) => {return(<div><div style = {{display: "flex"}}>
            <Typography variant = "subtitle2" fontWeight="fontWeightBold" style={{marginTop: "0px"}}>{`Name : \xa0 ${row[0]}`}</Typography>
            <Typography variant = "subtitle2" fontWeight="fontWeightBold" style={{marginTop: "0px"}}>{` \xa0 \xa0 \xa0 \xa0 Grant No. : \xa0 ${row[1]}`}</Typography>
            </div>
            {row[2] ? <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>{`URL : \xa0 ${row[2]}`}</Typography> : <Typography style={{marginTop: "0px",marginBottom: "12px"}}/>}
          </div>)}) :
        <Typography variant = "subtitle2"  style={{marginTop: "0px",marginBottom: "12px"}}>N/A</Typography>}
      <Divider/>
        <Typography variant = "subtitle2" style = {{color: "#5bc0be", marginBottom: "0px", paddingTop: "12px"}}>Keywords</Typography>
          {data.keywords.data ? <div style = {{marginTop: "0px",marginBottom: "12px"}}>
          {data.keywords.data.map((row,index) => {return(<Chip
              size="medium"
              variant="outlined"
              label={row}
            />)})} </div>: <Typography variant = "subtitle2" style={{marginTop: "0px",marginBottom: "12px"}}>N/A</Typography>}
        <Divider />
      <div>
        <StepBottom {...props} />
      </div>
    </form>
    </Paper>
  )
}


function getSteps() {
  return ['Dataset Info', 'Sample', 'Experiment Types', 'Funding Source','Keywords', 'Publications', 'Review'];
}

const StepContent = props => {
//  const classes = useStyles();
//  const {sample, experimentType, fundingSource, keyword, paper, steps, activeStep, isStepOptional, handleBack, handleNext, handleSkip} = props;
    const {activeStep} = props;
  switch (activeStep) {
    case 0:
      return <DatasetDet {...props} />;
    case 1:
      return <Sample {...props} />;

    case 2:
      return <Experiment {...props}/>;

    case 3:
      return <Funding {...props}/>;

    case 4:
      return <Keywords {...props}/>;

    case 5:
      return <Papers {...props}/>;

    case 6:
      return <Review {...props}/>;

    default:
      return 'Unknown step';
  }
}

export default function AddDataset(props) {
  const classes = useStyles();
  const [experimentType] = useFetch(ExperimentType);
  const [fundingSource] = useFetch(FundingSource);
  const [keyword] = useFetch(Keyword);
  const [paper] = useFetch(PaperID);
  const [sample] = useFetch(SampleData);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const [dataset, setDataset] = useState({});
  const [sampleData, setSampleData] = useState({});
  const [experiment, setExperiment] = useState({data: []});
  const [funding, setFunding] = useState({data: []});
  const [keywords, setKeywords] = useState({data: []});
  const [papers, setPapers] = useState({data: []})
  const isAuthenticated = useSelector(state => state.user.token);
  const sidebar = useSelector(state => state.sidebar);

  const isStepOptional = step => {
  //  return step === 1;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleDatasetSubmit = (name , description, isPublic) => {
    setDataset({ "name": name , "description" : description, "isPublic" : isPublic })
  }

  const handleSampleSubmit = (data) => {
    setSampleData(data)
  }

  const handleExperimentSubmit = (data) => {
    console.log("expSubmit",data)
    setExperiment(data)
  }

  const handleFundingSubmit = (data) => {
    setFunding(data)
  }

  const handleKeywordSubmit = (data) => {
    setKeywords(data)
  }

  const handlePaperSubmit = (data) => {
    setPapers(data)
  }


  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleFinish = () => {
    props.history.push("/datasettable");
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={sidebar ? classes.root1 : classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div >
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div style = {{marginTop : "24px"}}>
            <StepContent
              steps = {steps}
              classes = {classes}
              activeStep ={activeStep}
              isStepOptional = {isStepOptional}
              handleBack = {handleBack}
              handleNext = {handleNext}
              handleSkip = {handleSkip}
              sample = {sample}
              experimentType = {experimentType}
              fundingSource = {fundingSource}
              keyword = {keyword}
              paper = {paper}
              handleDatasetSubmit ={handleDatasetSubmit}
              dataset = {dataset}
              sampleData = {sampleData}
              handleSampleSubmit = {handleSampleSubmit}
              experiment = {experiment}
              handleExperimentSubmit = {handleExperimentSubmit}
              funding = {funding}
              handleFundingSubmit = {handleFundingSubmit}
              keywords = {keywords}
              handleKeywordSubmit = {handleKeywordSubmit}
              papers = {papers}
              handlePaperSubmit = {handlePaperSubmit}
              isAuthenticated = {isAuthenticated}
              handleFinish = {handleFinish}/>

          </div>
        )}
      </div>
    </div>
  );
}
