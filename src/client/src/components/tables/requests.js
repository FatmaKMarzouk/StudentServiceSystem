import React from "react";
import "./requests.css";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles";

function createData(request, id) {
  return { request, id };
}

const services = [
  {
    serviceName: "شهادة قيد",
    studentID: 4249,
  },
  {
    serviceName: "ترانسكريبت المواد",
    studentID: 4237,
  },
  {
    serviceName: "شهادة قيد",
    studentID: 4005,
  },
  {
    serviceName: "ترانسكريبت المواد",
    studentID: 4274,
  },
  {
    serviceName: "شهادة قيد",
    studentID: 4283,
  },
  {
    serviceName: "ترانسكريبت المواد",
    studentID: 3889,
  },
  {
    serviceName: "شهادة قيد",
    studentID: 3781,
  },
  {
    serviceName: "ترانسكريبت المواد",
    studentID: 4001,
  },
];

const allServices = [
  {
    serviceName: "شهادة قيد",
    studentID: 4000,
  },
  {
    serviceName: "ترانسكريبت المواد",
    studentID: 4001,
  },
  {
    serviceName: "شهادة قيد",
    studentID: 4002,
  },
  {
    serviceName: "ترانسكريبت المواد",
    studentID: 4003,
  },
  {
    serviceName: "شهادة قيد",
    studentID: 4004,
  },
  {
    serviceName: "ترانسكريبت المواد",
    studentID: 4005,
  },
  {
    serviceName: "شهادة قيد",
    studentID: 4006,
  },
  {
    serviceName: "ترانسكريبت المواد",
    studentID: 4007,
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "id", numeric: true, disablePadding: false, label: "الرقم الجامعي" },
  {
    id: "request",
    numeric: false,
    disablePadding: true,
    label: "الطلب",
  },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow id="requests-headers">
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "right"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            id="table-header"
          >
            {headCell.label}
          </TableCell>
        ))}
        <TableCell padding="checkbox" id="table-header"></TableCell>
        {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
              </TableCell>*/}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    borderBottom: "solid 2px #d6a937",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: "rgb(220, 220, 220, 0.8)",
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

function getTableTitle(id) {
  switch (id) {
    case 0:
      return <span id="table-title">الطلبات الجديدة</span>;
    case 1:
      return <span id="table-title"> جميع الطلبات</span>;
    default:
      return;
  }
}

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        /*{
        [classes.highlight]: numSelected > 0
      }*/
      })}
    >
      <div id="requests-bar">
        <div className={classes.search} id="requests-search">
          <div
            className={classes.searchIcon}
            style={{ marginRight: "5px", fontSize: "1px" }}
          >
            <SearchIcon />
          </div>
          <InputBase
            placeholder="....بحث"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            style={{ fontFamily: "Cairo" }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>

        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {getTableTitle(props.id)}
        </Typography>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    minWidth: "550px",
    height: "545px",
    marginBottom: theme.spacing(2),
    backgroundColor: "rgb(255,255,255,0.9)",
    overflow: "auto",
    padding: "15px",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "20px",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function GetTable(id) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [dense] = React.useState(true);

  const numSelected = selected.length;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, request) => {
    const selectedIndex = selected.indexOf(request);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, request);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (request) => selected.indexOf(request) !== -1;
  switch (id) {
    case 0:
      return (
        <React.Fragment>
          <div id="requests-container">
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={services.length}
                />
                <TableBody>
                  {services.map((service) => {
                    const isItemSelected = isSelected(service.studentID);
                    //const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) =>
                          handleClick(event, service.studentID)
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={service.studentID}
                        selected={isItemSelected}
                        id="requests-rows"
                      >
                        <TableCell id="table-body" align="center">
                          {service.studentID}
                        </TableCell>
                        <TableCell
                          component="th"
                          id={service.studentID}
                          scope="row"
                          padding="none"
                          align="right"
                          id="table-body"
                        >
                          {service.serviceName}
                        </TableCell>
                        <TableCell padding="checkbox" id="table-body">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": service.studentID,
                            }}
                            className="requests-checkbox"
                            color="default"
                            classes={{ root: "requests-checkbox" }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          {numSelected > 0 ? (
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1"
              component="div"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <span id="requests-selected-number">
                {numSelected} : عدد الاختيار
              </span>
            </Typography>
          ) : (
            <div></div>
          )}
        </React.Fragment>
      );
    case 1:
      return (
        <React.Fragment>
          <div id="requests-container">
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={allServices.length}
                />
                <TableBody>
                  {allServices.map((service) => {
                    const isItemSelected = isSelected(service.studentID);
                    //const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) =>
                          handleClick(event, service.studentID)
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={service.studentID}
                        selected={isItemSelected}
                        id="requests-rows"
                      >
                        <TableCell id="table-body" align="center">
                          {service.studentID}
                        </TableCell>
                        <TableCell
                          component="th"
                          id={service.studentID}
                          scope="row"
                          padding="none"
                          align="right"
                          id="table-body"
                        >
                          {service.serviceName}
                        </TableCell>
                        <TableCell padding="checkbox" id="table-body">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": service.studentID,
                            }}
                            className="requests-checkbox"
                            color="default"
                            classes={{ root: "requests-checkbox" }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          {numSelected > 0 ? (
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1"
              component="div"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <span id="requests-selected-number">
                {numSelected} : عدد الاختيار
              </span>
            </Typography>
          ) : (
            <div></div>
          )}
        </React.Fragment>
      );
  }
}

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} id={props.id} />

        {GetTable(props.id)}
      </Paper>
    </div>
  );
}
