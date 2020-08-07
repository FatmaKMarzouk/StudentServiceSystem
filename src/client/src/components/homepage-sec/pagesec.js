import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountCircle from "@material-ui/icons/AccountCircle";
//import { mainListItems, secondaryListItems } from "./listItems";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EnrollingNewStudent from "../functionalities-sec/EnrollingNewStudent";
import AddSecretary from "../functionalities-sec/AddSecretary";
import Upload from "../upload/Upload";
import ListItem from "@material-ui/core/ListItem";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Profile from "../profile/profile";
import { removeUserSession, getToken } from "../../Utils/Common";

import { addSecretary } from "../../core/Apis";

import "./home-sec.css";
import Requests from "../tables/requests.js";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
  },

  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    minWidth: "48px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#002346",
  },
  appBarShift: {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    //marginRight: 0
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    textAlign: "right",
    fontWeight: "bold",
    color: "white",
    textDecoration: "none",
    marginRight: "2%",
    fontFamily: "Cairo",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#002346",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    /*backgroundColor: "rgb(60, 100, 134)",*/
    backgroundImage: "url(wallpaper333.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: "#adc4cf",
  },
  container: {
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },

  fixedHeight: {
    height: 240,
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "rgb(0,51,102,0.6)",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function GetFunctionContent(func) {
  const [fetchRequests, setFetchRequests] = useState(0);
  switch (func) {
    case 0:
      return (
        <Grid item xs={12}>
          <Grid container justify="center" spacing="3">
            <Grid key="1" item>
              <Requests
                id={0}
                fetchRequests={() => setFetchRequests(fetchRequests + 1)}
              />
            </Grid>
            <Grid key="2" item>
              <Requests id={1} fetchRequests={fetchRequests} />
            </Grid>
          </Grid>
        </Grid>
      );
    case 1:
      return (
        <div style={{ paddingBottom: "35px" }}>
          <EnrollingNewStudent />
        </div>
      );
    case 2:
      return (
        <div className="Card">
          <Upload value="استمارة ٦ جند" stepNum={6} />
        </div>
      );
    case 3:
      return <Profile />;
    case 4:
      return <AddSecretary />;

    case 5:
      return <h1>TESST ERRORR!!</h1>;
    default:
      return "Unknown step";
  }
}

export default function SecHome(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeFunc, setActiveFunc] = React.useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleEnroll = () => {
    setActiveFunc(1);
  };

  const handleArmy = () => {
    setActiveFunc(2);
  };

  const handleHome = () => {
    setActiveFunc(0);
  };

  const handleProfile = () => {
    setActiveFunc(3);
  };

  const handleAddSec = () => {
    const token = getToken();
    console.log("token");
    console.log(token);

    addSecretary(token).then((data) => {
      console.log("In pagesec.js");
      if (data.error) {
        console.log("In pagesec.js error");
        console.log(data.message);
        setActiveFunc(5);
      } else {
        console.log("In pagesec.js success");
        console.log(data.message);
        setActiveFunc(4);
      }
    });
  };

  const handleLogout = () => {
    removeUserSession();
    props.history.push("/");
  };

  return (
    <div className={classes.root} id="hide-scrollbar">
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar} variant="dense">
          <IconButton
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="inherit"
            onClick={handleClick}
            style={{ padding: "0px", minWidth: "0" }}
          >
            <AccountCircle fontSize="medium" />
          </IconButton>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={handleProfile}>
              <ListItemText id="sec-profile-menu-item">حسابي</ListItemText>
              <ListItemIcon id="sec-profile-menu-item">
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
            </StyledMenuItem>
            <StyledMenuItem onClick={handleLogout}>
              <ListItemText id="sec-profile-menu-item">الخروج</ListItemText>
              <ListItemIcon id="sec-profile-menu-item">
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
            </StyledMenuItem>
          </StyledMenu>
          <Divider />

          <Link
            component="button"
            variant="h6"
            className={classes.title}
            underline="none"
            onClick={handleHome}
          >
            نظام الخدمات الإلكترونية للطلاب
          </Link>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
            style={{ padding: "0px", marginRight: "-2.8%" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div maxWidth="lg" className={classes.container}>
          {GetFunctionContent(activeFunc)}
        </div>
      </main>
      <Drawer
        variant="permanent"
        anchor="right"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon
              style={{ color: "white", marginRight: "-2.8%" }}
            />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div dir="rtl">
            <ListItem button onClick={handleEnroll}>
              <ListItemIcon>
                <PersonAddIcon
                  style={{ marginRight: "10%", color: "white" }}
                  fontSize="medium"
                />
              </ListItemIcon>
              <ListItemText style={{ textAlign: "right" }}>
                <span
                  style={{
                    color: "white",
                    fontFamily: "Cairo",
                    fontSize: "12px",
                  }}
                >
                  إضافة طالب جديد
                </span>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={handleArmy}>
              <ListItemIcon>
                <NoteAddIcon
                  style={{ marginRight: "7%", color: "white" }}
                  fontSize="medium"
                />
              </ListItemIcon>
              <ListItemText style={{ textAlign: "right" }}>
                <span
                  style={{
                    color: "white",
                    fontFamily: "Cairo",
                    fontSize: "12px",
                  }}
                >
                  تأجيل التجنيد العسكري
                </span>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={handleAddSec}>
              <ListItemIcon>
                <AddCircleIcon
                  style={{ marginRight: "10%", color: "white" }}
                  fontSize="medium"
                />
              </ListItemIcon>
              <ListItemText style={{ textAlign: "right" }}>
                <span
                  style={{
                    color: "white",
                    fontFamily: "Cairo",
                    fontSize: "12px",
                  }}
                >
                  إضافة شئون طلبة
                </span>
              </ListItemText>
            </ListItem>
          </div>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
