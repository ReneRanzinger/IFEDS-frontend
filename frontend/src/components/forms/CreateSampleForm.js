import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  menu: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const useFetch = (url,props) => {
  const [data, setData] = useState([ ]);

  useEffect( () => {
  let response =  fetch( url,
          {
            method: "GET",
            mode: 'cors',
             headers: setAuthorizationHeader(props.prop.isAuthenticated)
          }
        )
          .then(response => response.json())
          .then(res => {
            console.log(res)
            setData(res);
}).catch(error => console.log(response));
}, [props.prop.isAuthenticated, url] );
  return [data];
}

export default function MultilineTextFields(props) {
  const classes = useStyles();
  const theme = useTheme();
  const name = useFormInput('Anubhav');
  const sampleTypeId = useFormInput('1');
//  const providerId = useFormInput('1');
  const url = useFormInput('google.com');
  const description = useFormInput('google.com');
  const sampleDescriptorId = useFormInput([1,2]);
  const [sampleTypes] = useFetch("/SampleTypes",props);
  const [sampleDescriptor] = useFetch("/SampleDescriptors",props);

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-select-currency-native"
          select
          label="Sample Name"
          className={classes.textField}
          {...name}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your currency"
          margin="normal"
        />
        <TextField
          id="standard-select-currency-native"
          select
          label="Sample Type Id"
          className={classes.textField}
          {...sampleTypeId}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your currency"
          margin="normal"
        >
          {sampleTypes.filter(x => x['sampleTypeId']).map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <TextField
          id="standard-select-currency-native"
          select
          label="Url"
          className={classes.textField}
          {...url}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your currency"
          margin="normal"
        />
        <TextField
            id="standard-textarea"
            label="Description"
            placeholder="Placeholder"
            multiline
            className={classes.textField}
            margin="normal"
            {...description}
          />
      </div>
      <div>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Descriptor Id</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          {...sampleDescriptorId}
          input={<Input />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {sampleDescriptor.filter(x => x['sample_descriptor_id']).map(name => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={sampleDescriptor.filter(x => x['sample_descriptor_id']).indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Descriptor Id</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          {...sampleDescriptorId}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {sampleDescriptor.filter(x => x['sample_descriptor_id']).map(name => (
            <MenuItem key={name} value={name} style={getStyles(name, sampleDescriptor.filter(x => x['sample_descriptor_id']), theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
    </form>
);
}


function useFormInput(initialValue) {
  const [value,setValue] = useState(initialValue);
  function handleChange(event) {
    setValue(event.target.value);
  }
  return {
    value,
    onChange: handleChange
  };
}
