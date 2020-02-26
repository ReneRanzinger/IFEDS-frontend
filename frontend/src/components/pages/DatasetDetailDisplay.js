import React, { useReducer, useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import SaveIcon from "@material-ui/icons/Save";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import { Dataset } from "../../apiCalls";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import ListItem from "@material-ui/core/ListItem";

const EditableHeader = props => {
  const classes = useEditableHeaderStyles();
  const { head, edit, isEditable, handleHeaderChange, variant } = props;

  const handleClick = (e, edit) => {
    e.preventDefault();
    handleHeaderChange(e, edit, head);
  };
  return (
    <div className={classes.root}>
      <Typography variant={variant} className={classes.header}>
        {head}
      </Typography>
      {isEditable && (
        <Tooltip title={edit} type="submit" onClick={e => handleClick(e, edit)}>
          <IconButton aria-label={edit}>
            {edit === "Edit" ? <EditIcon /> : <SaveIcon />}
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

const useEditableHeaderStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  header: {
    color: "green",
    marginBottom: "0px",
    paddingTop: "12px"
  }
}));

const EditableDropDown = props => {
  const { name, state, handleDropDownChange, classes, list } = props;

  const handleChange = e => {
    handleDropDownChange(e, name);
  };

  return (
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
          className: classes.menu
        }
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
  );
};

const EditableDropDownChip = props => {
  const {
    name,
    id,
    id1,
    state,
    handleDropDownChangeChip,
    classes,
    list
  } = props;
  const [data, setData] = useState(state);
  const [initialChip, setInitialChip] = useState(true);

  const handleChange = e => {
    if (initialChip) {
      state.map(row => data.push(row[`${id}`]));
      setData([...data]);
      setInitialChip(false);
    }
    const newValue = e.target.value;
    const temp = list.filter(e => e.name === newValue);
    setData(() => {
      if (
        data.filter(tempo => tempo["name"] === temp[0]["name"]).length !== 1
      ) {
        data.push(temp[0]);
      }
      return [...data];
    });
  };

  const handleHeaderChangeForChip = (e, edit, head) => {
    if (initialChip) {
      state.map(row => data.push(row[`${id}`]));
      setData([...data]);
      setInitialChip(false);
    }
    handleDropDownChangeChip(data, edit, head);
  };

  const handleDelete = (e, index) => {
    if (initialChip) {
      state.map(row => data.push(row[`${id}`]));
      setData([...data]);
      setInitialChip(false);
    }
    console.log(data, index);
    setData(data => {
      const data1 = [...data];
      data1.splice(index, 1);
      return [...data1];
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("sub", data);
    handleDropDownChangeChip(data, true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <EditableHeader
          head={name}
          edit="Save"
          isEditable={true}
          variant="h6"
          handleHeaderChange={handleHeaderChangeForChip}
        />
        <Divider />

        <InputLabel shrink htmlFor="fundingSource">
          {name}
        </InputLabel>
        <NativeSelect
          value={data.name}
          onChange={handleChange}
          inputProps={{
            name: `${name}`,
            id: `${id}`
          }}
        >
          {list.map(option => (
            <option key={option[`${id1}`]} value={option.name}>
              {option.name}
            </option>
          ))}
        </NativeSelect>
        <div>
          {initialChip &&
            state.map((row, index) => {
              const ret = `${row[`${id}`]["name"]}`;
              return (
                <Chip
                  size="medium"
                  variant="outlined"
                  label={ret}
                  color="primary"
                  onDelete={e => handleDelete(e, index)}
                />
              );
            })}
        </div>
        <div>
          {data &&
            data.map((row, index) => {
              const ret = `${row["name"]}`;
              return (
                <Chip
                  size="medium"
                  variant="outlined"
                  label={ret}
                  color="primary"
                  onDelete={e => handleDelete(e, index)}
                />
              );
            })}
        </div>
      </form>
    </div>
  );
};

const EditableDropDownChip1 = props => {
  const {
    name,
    id,
    id1,
    state,
    handleDropDownChangeChip,
    classes,
    list
  } = props;
  const [data, setData] = useState(state);
  const [initialChip, setInitialChip] = useState(true);

  const handleChange = e => {
    if (initialChip) {
      state.map(row => {
        console.log("set", row);
        data.push(row);
      });
      setData([...data]);
      setInitialChip(false);
    }
    const newValue = e.target.value;
    const temp = list.filter(e => e.name === newValue);
    setData(() => {
      if (
        data.filter(tempo => tempo["name"] === temp[0]["name"]).length !== 1
      ) {
        data.push(temp[0]);
      }
      return [...data];
    });
  };

  const handleHeaderChangeForChip = (e, edit, head) => {
    if (initialChip) {
      state.map(row => data.push(row));
      setData([...data]);
      setInitialChip(false);
    }
    handleDropDownChangeChip(data, edit, head);
  };

  const handleDelete = (e, index) => {
    if (initialChip) {
      state.map(row => data.push(row));
      setData([...data]);
      setInitialChip(false);
    }
    console.log(data, index);
    setData(data => {
      const data1 = [...data];
      data1.splice(index, 1);
      return [...data1];
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("sub", data);
    handleDropDownChangeChip(data, true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <EditableHeader
          head={name}
          edit="Save"
          isEditable={true}
          variant="h6"
          handleHeaderChange={handleHeaderChangeForChip}
        />
        <Divider />

        <InputLabel shrink htmlFor="fundingSource">
          {name}
        </InputLabel>
        <NativeSelect
          value={data.name}
          onChange={handleChange}
          inputProps={{
            name: `${name}`,
            id: `${id}`
          }}
        >
          {list.map(option => (
            <option key={option[`${id1}`]} value={option.name}>
              {option.name}
            </option>
          ))}
        </NativeSelect>
        <div>
          {initialChip &&
            state.map((row, index) => {
              console.log(state);
              const ret = `${row["name"]}`;
              return (
                <Chip
                  size="medium"
                  variant="outlined"
                  label={ret}
                  color="primary"
                  onDelete={e => handleDelete(e, index)}
                />
              );
            })}
        </div>
        <div>
          {data &&
            data.map((row, index) => {
              const ret = `${row["name"]}`;
              return (
                <Chip
                  size="medium"
                  variant="outlined"
                  label={ret}
                  color="primary"
                  onDelete={e => handleDelete(e, index)}
                />
              );
            })}
        </div>
      </form>
    </div>
  );
};

const DataExperiment = props => {
  const classes = useDataStyles();
  const { state, name } = props;

  return (
    <div>
      <EditableHeader head={name} isEditable={false} variant="h6" />
      <Divider />
      {state &&
        state.map((row, index) => {
          const ret = `${row["experimentType"]["name"]} `;
          return (
            <ListItem>
              <Chip
                size="medium"
                variant="outlined"
                label={ret}
                color="primary"
              />
            </ListItem>
          );
        })}
    </div>
  );
};
const useDataStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  header: {
    color: "green",
    marginBottom: "0px",
    paddingTop: "12px"
  }
}));

const Data = props => {
  const classes = useDataStyles1();
  const { state, name } = props;

  return (
    <div>
      <EditableHeader head={name} isEditable={false} variant="h6" />
      <Divider />
      {state &&
        state.map((row, index) => {
          const ret = `${row[0]} `;
          return (
            <ListItem>
              <Chip
                size="medium"
                variant="outlined"
                label={ret}
                color="primary"
              />
            </ListItem>
          );
        })}
    </div>
  );
};

const useDataStyles1 = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  header: {
    color: "green",
    marginBottom: "0px",
    paddingTop: "12px"
  }
}));

const DatasetDetailDisplay = props => {
  const classes = useToolbarStyles();
  const [editable, setEditable] = useState(false);
  const [editableSample, setEditableSample] = useState(true);
  const [editableProvider, setEditableProvider] = useState(false);
  //const [provider, setProvider] = useState({});
  const {
    match: { params }
  } = props;
  //  const [editDataset, setEditDataset] = useState(false)

  const [dataset, setDataset] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      datasetId: "",
      datasetName: "",
      description: "",
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
      name: "",
      providerGroup: "",
      department: "",
      affiliation: "",
      url: "",
      contact: "",
      username: "",
      email: ""
    }
  );

  const [sample, setSample] = useState({});
  const [experimentTypes, setExperimentTypes] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [fundingSource, setFundingSource] = useState([]);

  const sampleEx = props.sample;
  const experiment = props.experimentType;
  const fundingSourceEx = props.fundingSource;
  const keywordEx = props.keyword;

  const handleChange = e => {
    console.log(e.target.name);
    const name = e.target.name;
    const newValue = e.target.value;
    setDataset({ [name]: newValue });
  };

  const handleChangeForDropDown = (e, name) => {
    const newValue = e.target.value;
    if (name === "sample") {
      const sampleTest = sampleEx.filter(e => e.name === newValue);
      setSample(sampleTest[0]);
    }
  };

  const handleDropDownChangeChip = (data, edit) => {
    console.log("submit", data);
    setExperimentTypes(data);
  };

  const handleDropDownChangeChip1 = (data, edit) => {
    console.log("submit", data);
    setFundingSource(data);
  };

  const handleDropDownChangeChip2 = (data, edit) => {
    console.log("submit", data);
    setKeywords(data);
  };

  const handleSampleSubmit = e => {
    console.log(sample);
    setDataset({ [sample]: sample });
    setEditableSample(!editableSample);
  };

  const handleHeaderChange = (e, edit, head) => {
    if (edit === "Save") {
      if (head === "Sample") {
        handleClick1(e);
      }
      if (head === `${dataset.name}`) {
        handleClick(e);
      }
    }
    if (edit === "Edit") {
      if (head === "Sample") {
        handleClick1(e);
      }
      if (head === `${dataset.name}`) {
        handleClick(e);
      }
    }
  };

  const handleClick = e => {
    setEditable(!editable);
  };
  const handleClick1 = e => {
    setEditableSample(!editableSample);
  };
  const handleClick2 = e => {
    setEditableProvider(!editableProvider);
  };

  useEffect(() => {
    fetch(`${Dataset}/${params.id}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(res => {
        setDataset(res);
        setProvider(res.provider);
        setSample(res.sample);
        setExperimentTypes(res.experimentTypes);
        setKeywords(res.keywords);
        setFundingSource(res.fundingSources);
        //  setEditDataset(props.editDataset)
        console.log(res);
      })
      .catch(error => console.log(error));
  }, [params.id]);

  return (
    <Paper className={classes.root}>
      <Card className={classes.bullet}>
        {!editable ? (
          <div>
            <EditableHeader
              head={dataset.name}
              edit={editable ? "Edit" : "Save"}
              isEditable={props.editDataset}
              variant="h6"
              handleHeaderChange={handleHeaderChange}
            />

            <h3>{dataset.description}</h3>
          </div>
        ) : (
          <Card className={classes.bullet}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              {props.editDataset && (
                <Tooltip title="Save" type="submit">
                  <IconButton aria-label="save">
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            <TextField
              multiline
              id="description"
              label="Description"
              name="description"
              rowsMax="4"
              size="large"
              value={dataset.description}
              defaultValue={dataset.description}
              onChange={handleChange}
              fullWidth
              type="text"
              margin="normal"
            />
          </Card>
        )}
      </Card>
      <EditableDropDownChip
        id="experimentType"
        id1="experimentTypeId"
        name="Experiment Type"
        state={experimentTypes}
        classes={classes}
        list={experiment}
        handleDropDownChangeChip={handleDropDownChangeChip}
      />

      <DataExperiment state={experimentTypes} name="Experiment Type" />

      <EditableDropDownChip1
        id="keywords"
        id1="keywordId"
        name="Keywords"
        state={keywords}
        classes={classes}
        list={keywordEx}
        handleDropDownChangeChip={handleDropDownChangeChip2}
      />

      <EditableDropDownChip
        id="fundingSource"
        id1="fundingSourceId"
        name="Funding Source"
        state={fundingSource}
        classes={classes}
        list={fundingSourceEx}
        handleDropDownChangeChip={handleDropDownChangeChip1}
      />

      <div style={{ display: "flex" }}>
        {editableSample ? (
          <Card className={classes.bullet1}>
            <EditableHeader
              head="Sample"
              edit={editableSample ? "Edit" : "Save"}
              isEditable={props.editDataset}
              variant="h6"
              handleHeaderChange={handleHeaderChange}
            />
            <Divider />
            <Typography
              variant="subtitle2"
              style={{ color: "#5bc0be", marginBottom: "0px" }}
            >
              Name
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ marginTop: "0px", marginBottom: "12px" }}
            >
              {sample.name}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ color: "#5bc0be", marginBottom: "0px" }}
            >
              Description
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ marginTop: "0px", marginBottom: "12px" }}
            >
              {sample.description}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ color: "#5bc0be", marginBottom: "0px" }}
            >
              URL
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ marginTop: "0px", marginBottom: "12px" }}
            >
              {sample.url}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ color: "#5bc0be", marginBottom: "0px" }}
            >
              Sample Descriptors
            </Typography>
            {sample.sampleDescriptors &&
              sample.sampleDescriptors.map((row, index) => {
                const ret = `${row["sampleDescriptor"]["name"]} :\xa0\xa0 ${row["value"]} \xa0\xa0  ${row["unitOfMeasurement"]}`;
                return (
                  <Chip
                    size="medium"
                    variant="outlined"
                    label={ret}
                    color="primary"
                  />
                );
              })}
          </Card>
        ) : (
          <Card className={classes.bullet1}>
            <form onSubmit={handleSampleSubmit}>
              <EditableHeader
                head="Sample"
                edit={editableSample ? "Edit" : "Save"}
                isEditable={props.editDataset}
                variant="h6"
                handleHeaderChange={handleHeaderChange}
              />
              <Divider />
              <EditableDropDown
                name="sample"
                state={sample.name}
                classes={classes}
                list={sampleEx}
                handleDropDownChange={handleChangeForDropDown}
              />
            </form>
          </Card>
        )}

        {!editableProvider && (
          <Card className={classes.bullet2}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ color: "green" }}>Provider</h3>
            </div>
            <Divider />
            <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>Name</h4>
            <h4 style={{ marginTop: "0px" }}>{provider.name}</h4>
            {provider.providerGroup && (
              <div>
                <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>Group</h4>
                <h4 style={{ marginTop: "0px" }}>{provider.providerGroup}</h4>
              </div>
            )}
            {provider.department && (
              <div>
                <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                  Department
                </h4>
                <h4 style={{ marginTop: "0px" }}>{provider.department}</h4>
              </div>
            )}
            {provider.affiliation && (
              <div>
                <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                  Affiliation
                </h4>
                <h4 style={{ marginTop: "0px" }}>{provider.affiliation}</h4>
              </div>
            )}
            {provider.url && (
              <div>
                <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>URL</h4>
                <h4 style={{ marginTop: "0px" }}>{provider.url}</h4>
              </div>
            )}
            {provider.contact && (
              <div>
                <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                  Contact
                </h4>
                <h4 style={{ marginTop: "0px" }}>{provider.contact}</h4>
              </div>
            )}
            {provider.username && (
              <div>
                <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                  Username
                </h4>
                <h4 style={{ marginTop: "0px" }}>{provider.username}</h4>
              </div>
            )}
            {provider.email && (
              <div>
                <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>Email</h4>
                <h4 style={{ marginTop: "0px" }}>{provider.email}</h4>
              </div>
            )}
          </Card>
        )}
      </div>
    </Paper>
  );
};

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
    width: "70%",
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2)
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
  menu: {
    width: 200
  }
}));

export default DatasetDetailDisplay;
