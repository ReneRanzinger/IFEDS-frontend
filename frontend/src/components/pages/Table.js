import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ReadMoreAndLess from 'react-read-more-less';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import TablePaginationActions from "../../utils/TablePaginationActions";
//import * as errorHandlerActions from '../../actions/auth';
import Headcells from '../../utils/setTableHeader';
import {Datasets} from '../../apiCalls'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0)
      return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

export function EnhancedTableHead(props) {
  const {classes, order, orderBy, onRequestSort} = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (<TableHead>
    <TableRow>
      {
        Headcells.map(headCell => (<TableCell key={headCell.id} align={headCell.numeric
            ? 'left'
            : 'left'} padding={headCell.disablePadding
            ? 'default'
            : 'none'} sortDirection={orderBy === headCell.id
            ? order
            : false}>
          <TableSortLabel active={orderBy === headCell.id} direction={order} onClick={headCell.id === 'description'
              ? null
              : createSortHandler(headCell.id)} hideSortIcon={headCell.id === 'description'
              ? true
              : false}>
            {headCell.label}
            {
              orderBy === 'name'
                ? (<span className={classes.visuallyHidden}>
                  {
                    order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'
                  }
                </span>)
                : null
            }
          </TableSortLabel>
        </TableCell>))
      }
    </TableRow>
  </TableHead>);
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  //  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  //onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  //rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(0),
    textAlign: 'left'
  },
  highlight: theme.palette.type === 'light'
    ? {
      color: theme.palette.secondary.main,
      backgroundColor: lighten(theme.palette.secondary.light, 0.85)
    }
    : {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.secondary.dark
    },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const {numSelected} = props;

  return (<Toolbar className={clsx(classes.root, {
      [classes.highlight]: numSelected > 0
    })}>
    <div className={classes.title}>
      <Typography variant="h6" id="tableTitle">
        Data Collections
      </Typography>
    </div>
    <div className={classes.spacer}/>
  </Toolbar>);
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  super: {
    overflow: 'visible'
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  root1: {
    marginTop: theme.spacing(1),
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  paper: {
    width: '99%',
    padding: 10,
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableComp: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom : theme.spacing(2)
  },
  tableCell: {
    paddingTop : theme.spacing(2),
    paddingBottom : theme.spacing(2),
    paddingRight : theme.spacing(3)
  },
  searchPage: {
    marginLeft: theme.spacing(4)
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}));





export default function EnhancedTable(props) {
  let serverError = false;
  const [errors, setErrors] = useState('');

  const useFetch = (url, props, openAlert) => {
    const [data, setData] = useState([  ]);
    useEffect(() => {
      fetch(url, {
        method: "GET",
        mode: 'cors',
        headers: setAuthorizationHeader(props.prop.isAuthenticated)
      }).then(checkStatus).then(res => {
        if(serverError){
          console.log(res.message)
          props.prop.logout()
          setErrors({"Server Error" : res.message});
          return
      } else {
        console.log("res", res)
        setData(res);
      } }).catch(error => console.log(error));
    }, [props.prop.isAuthenticated, url]);
    return [data];
  }
  const classes = useStyles();


  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('datasetName');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = useState(false);
  const sidebar = useSelector(state => state.sidebar);




  const openAlert= () => {
    setOpen(true)
  }

  const checkStatus = res => {
    if(res.ok) {
      return res.json()
    } else {
      serverError = true;
      return res.json()
    }
  }

  const [data] = useFetch(Datasets, props, openAlert);


  const [query, setQuery] = React.useState("");

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(
      isDesc
      ? 'asc'
      : 'desc');
    setOrderBy(property);
  };

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
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1),);
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+ event.target.value);
    setPage(0);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const isSelected = name => selected.indexOf(name) !== -1;
  // changed rows to data
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const lowerCaseQuery = query.toLowerCase();
  return (<div className={classes.super}>
    <div className={sidebar ? classes.root1 : classes.root}>
      { errors["Server Error"] ?
        <Alert severity="error">
          <AlertTitle> Server Error</AlertTitle>
            {errors["Server Error"]}<strong> Check it out! Try to refresh this page.</strong>
        </Alert>
          :
          ""
          }
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
        message = "Session Expired !! Logging Out!"/>



      <Paper className={classes.paper}>
        <EnhancedTableToolbar/>
        <div className={classes.tableComp}>

          <TextField className={classes.searchPage} label="Search" value={query} onChange={e => setQuery(e.target.value)}/>

            <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={data.length} rowsPerPage={rowsPerPage} page={page} SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} ActionsComponent={TablePaginationActions}/>
        </div>

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size={'medium'} padding="none">
            <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort}/>
            <TableBody>
              {
                stableSort(
                  query
                  ? data.filter(x => (((x["providerName"].toLowerCase().includes(lowerCaseQuery)) || x["sampleName"].toLowerCase().includes(lowerCaseQuery)) || x["datasetName"].toLowerCase().includes(lowerCaseQuery)))
                  : data,
                getSorting(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  const isItemSelected = isSelected(row.datasetName);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.datasetName)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.datasetId}
                      selected={isItemSelected}
                    >
                    {console.log("rowData", row)}
                      <TableCell component="th" id={labelId} scope="row" className = {classes.tableCell} >
                        <Link to={`/datasetDetail/${row.datasetId}`}>{row.datasetName}</Link>
                      </TableCell>
                      <TableCell align="left" className = {classes.tableCell} >{row.providerName}</TableCell>
                      <TableCell align="left" className = {classes.tableCell}>{row.sampleName}</TableCell>
                      <TableCell align="left" className = {classes.tableCell}>{row.created_at}</TableCell>
                      <TableCell align="left" className = {classes.tableCell} >{row.description && <ReadMoreAndLess className="read-more-content"
                                                               charLimit={125}
                                                               readMoreText="...read more"
                                                               readLessText="...read less">
                                              {row.description}
                                            </ReadMoreAndLess>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={data.length} rowsPerPage={rowsPerPage} page={page} SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} ActionsComponent={TablePaginationActions}/>
      </Paper>

    </div>
  </div>);
}
