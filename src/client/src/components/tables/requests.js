import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
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
import PrintIcon from "@material-ui/icons/Print";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import { fade } from "@material-ui/core/styles";
import { getToken } from "../../Utils/Common";
import {
  allRequestsApi,
  undoneRequestsApi,
  searchRequests,
  searchUndoneRequests,
  requestDone,
  requestReceived,
} from "../../core/Apis";

const headCells = [
  {
    id: "status",
    numeric: true,
    disablePadding: true,
    label: "الحالة",
  },
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

  return (
    <TableHead>
      <TableRow id="requests-headers">
        <TableCell padding="checkbox" id="table-header"></TableCell>
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

function getRequestStatus(done, received) {
  console.log("DONE=" + done + "RECEIVED=" + received);
  if (done && received) return "تم الاستلام";
  else if (done) return "تم الانتهاء";
  else return "-";
}

function getRequestName(requestName) {
  if (requestName == "Choose Program") return "اختيار البرنامج";
  else if (requestName == "Annual fees") return "مصاريف عام";
  else if (requestName == "Student Card") return "الكارنيه الجامعي";
  else if (requestName == "Request Transcript") return "طلب ترانسكريبت المواد";
  else if (requestName == "Certificate of Enrollment") return "شهادة قيد";
}

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const token = getToken();

  /*const onChange = (event) => {
    console.log("Student id=" + event.target.value);
    const studentid = event.target.value;
    searchRequests(token, studentid).then((data) => {
      console.log(data);
    });
  };
*/
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
            //onChange={onChange}
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
    backgroundColor: "rgb(255,255,255,0.7)",
    overflow: "auto",
    padding: "15px",
    border: "2px solid #003366",
    boxShadow: "-1px 14px 13px 2px rgba(184,184,184,1)",
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

export default function EnhancedTable(props) {
  const classes = useStyles();
  const classess = useToolbarStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("status");
  const [selected, setSelected] = React.useState([]);
  const [requests, setRequests] = React.useState([]);
  const [allRequests, setAllRequests] = React.useState([]);
  const [requestCount, setRequestCount] = React.useState(0);
  const [dense] = React.useState(true);
  const token = getToken();

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

    if (props.id) {
      requestReceived(token, request).then(() => {
        setRequestCount(requestCount + 1);
        setSelected([]);
      });
    } else {
      requestDone(token, request).then(() => {
        setRequestCount(requestCount + 1);
        props.fetchRequests();
        setSelected([]);
      });
    }
  };

  const handleDownload = (file, requestName, studentID) => {
    var array = new Uint8Array(file.data);
    var blob = new Blob([array], {
      type: "application/octet-stream",
    });
    /*var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "myFileName.docx";
    link.click();*/
    saveAs(blob, requestName + "_" + studentID + ".docx");
    /* var download = require("downloadjs");
    download(blob, requestName + "_" + studentID + ".docx");*/
  };

  const isSelected = (request) => selected.indexOf(request) !== -1;

  useEffect(() => {
    switch (props.id) {
      case 1:
        allRequestsApi(token).then((data) => {
          console.log(data);
          console.log("nhayet el data");
          const orderObjects = [];
          if (!data.error) {
            data.results.map((request) => {
              const orderObject = {
                requestID: request.ID,
                requestName: request.ServiceName,

                studentID: request.StudentID,
                done: request.done,
                received: request.received,
                file: request.document,
              };
              orderObjects.push(orderObject);
            });
          }
          setAllRequests(orderObjects);
          setRequests(orderObjects);
        });

        console.log("ALL REQUESTS");
        break;
      case 0:
        undoneRequestsApi(token).then((data) => {
          console.log(data);
          console.log("nhayet el data");
          const orderObjects = [];
          if (!data.error) {
            data.array.map((request) => {
              const orderObject = {
                requestID: request.ID,
                requestName: request.ServiceName,

                studentID: request.StudentID,
                done: request.done,
                received: request.received,
                file: request.document,
              };
              orderObjects.push(orderObject);
            });
          }
          setAllRequests(orderObjects);
          setRequests(orderObjects);
        });
        console.log("UNDONE REQUESTS");
        break;
    }
  }, [requestCount, props.fetchRequests]);

  const onChange = (event) => {
    console.log("Student id=" + event.target.value);
    const studentid = event.target.value;
    if (event.target.value == "") {
      console.log("EMPTY SEARCH");
      setRequests(allRequests);
    } else {
      switch (props.id) {
        case 1:
          searchRequests(token, studentid).then((data) => {
            const searchedObjects = [];
            if (!data.error) {
              data.array2.map((request) => {
                const orderObject = {
                  requestID: request.ID,
                  requestName: request.ServiceName,

                  studentID: request.StudentID,
                  done: request.done,
                  received: request.received,
                  file: request.document,
                };
                searchedObjects.push(orderObject);
              });
            }
            setRequests(searchedObjects);
          });
          break;
        case 0:
          searchUndoneRequests(token, studentid).then((data) => {
            const searchedObjects = [];
            if (!data.error) {
              data.array2.map((request) => {
                const orderObject = {
                  requestID: request.ID,
                  requestName: request.ServiceName,

                  studentID: request.StudentID,
                  done: request.done,
                  received: request.received,
                  file: request.document,
                };
                searchedObjects.push(orderObject);
              });
            }
            setRequests(searchedObjects);
          });
          break;
      }
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar
          className={clsx(classess.root, {
            /*{
        [classes.highlight]: numSelected > 0
      }*/
          })}
        >
          <div id="requests-bar">
            <div className={classess.search} id="requests-search">
              <div
                className={classess.searchIcon}
                style={{ marginRight: "5px", fontSize: "1px" }}
              >
                <SearchIcon />
              </div>
              <InputBase
                placeholder="....بحث"
                classes={{
                  root: classess.inputRoot,
                  input: classess.inputInput,
                }}
                style={{ fontFamily: "Cairo" }}
                inputProps={{ "aria-label": "search" }}
                onChange={onChange}
              />
            </div>

            <Typography
              className={classess.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {getTableTitle(props.id)}
            </Typography>
          </div>
        </Toolbar>
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
                rowCount={requests.length}
              />
              <TableBody>
                {requests.map((service) => {
                  const isItemSelected = isSelected(service.requestID);
                  //const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={service.requestID}
                      selected={isItemSelected}
                      id="requests-rows"
                    >
                      <TableCell padding="checkbox" id="table-header">
                        {service.requestName === "Choose Program" ||
                        service.requestName === "Annual Fees" ||
                        service.requestName === "Student Card" ? (
                          <div></div>
                        ) : (
                          <Button
                            id="requests-download-button"
                            onClick={() =>
                              handleDownload(
                                service.file,
                                service.requestName,
                                service.studentID
                              )
                            }
                          >
                            <GetAppIcon style={{ fontSize: "20px" }} />
                          </Button>
                        )}
                      </TableCell>
                      <TableCell id="table-body" align="center">
                        {getRequestStatus(service.done, service.received)}
                      </TableCell>
                      <TableCell id="table-body" align="center">
                        {service.studentID}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="right"
                        id="table-body"
                      >
                        {getRequestName(service.requestName)}
                      </TableCell>
                      <TableCell padding="checkbox" id="table-body">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": service.requestID,
                          }}
                          className="requests-checkbox"
                          color="default"
                          classes={{ root: "requests-checkbox" }}
                          onClick={(event) =>
                            handleClick(event, service.requestID)
                          }
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
      </Paper>
    </div>
  );
}
