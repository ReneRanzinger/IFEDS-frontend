import React, {useEffect, useState} from 'react';
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
import * as errorHandlerActions from '../../actions/auth';
import Headcells from '../../utils/setTableHeader'

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
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    textAlign: 'center'
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

const useStyles = makeStyles(theme => ({
  super: {
    overflow: 'visible'
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(1)
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
    justifyContent: 'flex-end'
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

const useFetch = (url, props) => {
  const [data, setData] = useState([
    {
      "datasetId": 1,
      "datasetName": "Stem Cell Data 1",
      "sampleName": "Differenciated smooth cell",
      "providerName": "CCRC tr",
      "description": "Glycomics analysis performed with the stem cell data set 1."
    }, {
      "datasetId": 2,
      "datasetName": "Stem Cell Data 2",
      "sampleName": "Differenciated smooth muscle cell",
      "providerName": "CCRC ry",
      "description": "Glycomics analysis performed with the stem cell data set 2."
    }
  ]);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      mode: 'cors',
      headers: setAuthorizationHeader(props.prop.isAuthenticated)
    }).then(response => response.json()).then(res => {
      setData(res);
    }).catch(error => console.log(error));
  }, [props.prop.isAuthenticated, url]);
  return [data];
}

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('datasetName');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
<<<<<<< HEAD
  const [data] = useFetch("/datasets",props);


const [query, setQuery] = React.useState("");
=======
  const [data] = useFetch("/datasets", props);
>>>>>>> origin/master-backup

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

  const isSelected = name => selected.indexOf(name) !== -1;
  // changed rows to data
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const lowerCaseQuery = query.toLowerCase();
  return (<div className={classes.super}>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar/>
        <div className={classes.tableComp}>

          <TextField className={classes.searchPage} label="Search" value={query} onChange={e => setQuery(e.target.value)}/>

          <TablePagination className={classes.searchPage} rowsPerPageOptions={[5, 10, 25]} count={data.length} rowsPerPage={rowsPerPage} page={page} backIconButtonProps={{
              'aria-label' : 'previous page'
            }} nextIconButtonProps={{
              'aria-label' : 'next page'
            }} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage}/>
        </div>

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size={'medium'}>
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

<<<<<<< HEAD
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
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        <Link to={`/datasetDetail/${row.datasetId}`}>{row.datasetName}</Link>
                      </TableCell>
                      <TableCell align="left">{row.providerName}</TableCell>
                      <TableCell align="left">{row.sampleName}</TableCell>
                      <TableCell align="left"><ReadMoreAndLess className="read-more-content"
                                                               charLimit={125}
                                                               readMoreText="...read more"
                                                               readLessText="...read less">
                                              {row.description}
                                                </ReadMoreAndLess>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
=======
                  return (<TableRow hover="hover" onClick={event => handleClick(event, row.datasetName)} role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.datasetId} selected={isItemSelected}>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <Link to={`/datasetdetails/${row.datasetId}`}>{row.datasetName}</Link>
                    </TableCell>
                    <TableCell align="left">{row.providerName}</TableCell>
                    <TableCell align="left">{row.sampleName}</TableCell>
                    <TableCell align="left">
                      <ReadMoreAndLess className="read-more-content" charLimit={125} readMoreText="...read more" readLessText="...read less">
                        {row.description}
                      </ReadMoreAndLess>
                    </TableCell>
                  </TableRow>);
                })
              }
              {
                emptyRows > 0 && (<TableRow style={{
                    height: (
                      dense
                      ? 33
                      : 53) * emptyRows
                  }}>
                  <TableCell colSpan={6}/>
                </TableRow>)
              }
>>>>>>> origin/master-backup
            </TableBody>
          </Table>
        </div>
        <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={data.length} rowsPerPage={rowsPerPage} page={page} backIconButtonProps={{
            'aria-label' : 'previous page'
          }} nextIconButtonProps={{
            'aria-label' : 'next page'
          }} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage}/>
      </Paper>

    </div>
  </div>);
}
