import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten,makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const handleDelete = (event,props,id,postDelete) => {
   alert("Are you sure you want to delete" + id);
  console.log(id);


  let response =  fetch( `/samples/${id}`,
          {
            method: "DELETE",
            mode: 'cors',
             headers: setAuthorizationHeader(props.prop.isAuthenticated)
          }
        )
          .then(response => response.json())
          .then(res => {
            console.log(res)
            postDelete(true);

}).catch(error => {console.log(response);
postDelete(true)
});
postDelete(true)


}

const EnhancedTableToolbar = prop => {
  const classes = useToolbarStyles();
  const { numSelected, id, props, postDelete } = prop;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Sample List
        </Typography>
      )}
{console.log(prop)}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={event => handleDelete(event,props, id,postDelete)}>
            <DeleteIcon  />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  tableComp:{
    display : 'flex',
    justifyContent : 'flex-end'
  },
  searchPage: {
    marginLeft : theme.spacing(4)
  },
}));

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
  return [data,setData];
}

export default function SampleList(props) {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [data,setData] = useFetch("/getSample",props);


  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };


  const lowerCaseQuery = query.toLowerCase();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePostDelete = (isDeleted) => {
    if(isDeleted){
        setSelected([]);
        let response =  fetch( "/getSample",
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
    }
  setSelected([]);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length}
          id = {selected}
          props ={props}
          postDelete ={handlePostDelete} />

          <div className = {classes.tableComp}>

             <TextField
                  className = {classes.searchPage}
                  label = "Search"
                  value={query}
                  onChange={e => setQuery(e.target.value )}
                />
             <TablePagination
                  className = {classes.searchPage}
                  rowsPerPageOptions={[5, 10, 25]}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'previous page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'next page',
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
         </div>

      {(query?data.filter(x =>(x["name"].toLowerCase().includes(lowerCaseQuery))):data)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row,index)=> {
        return(
      <ExpansionPanel
        key={row.sampleId}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<Checkbox
              onClick={event => handleClick(event, row.sampleId)}/>}
            label={row.name}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography color="textSecondary">
            {row.description}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
    })}
  </Paper>
    </div>
  );
}
