import React, { Component } from "react";
import { link } from 'react-router-dom';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import NotificationsIcon from "@material-ui/icons/Notifications";
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
import Upload from "../upload/Upload";
import ListItem from "@material-ui/core/ListItem";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import Link from "@material-ui/core/Link";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    overflow: "hidden"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: "#003366"
  },
  appBarShift: {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    //marginRight: 0
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1,
    textAlign: "right",
    fontWeight: "bold",
    color: "white",
    textDecoration: "none",
    marginRight: "2%"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: "#003366"
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundImage: "url(bg_home.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: "rgb(0,51,102,0.6)",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

function getFunctionContent(func) {
  switch (func) {
    case 0:
      return;
    case 1:
      return <EnrollingNewStudent />;
    case 2:
      return (
        <div className="Card">
          <Upload value="استمارة ٦ جند" />
        </div>
      );
    default:
      return "Unknown step";
  }
}

export default function SecHome() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeFunc, setActiveFunc] = React.useState(0);

  const handleClick = event => {
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

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="inherit"
            onClick={handleClick}
            style={{ padding: "0px" }}
          >
            <AccountCircle fontSize="large" />
          </IconButton>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="My Account" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </StyledMenuItem>
          </StyledMenu>
          <Divider />
          <IconButton color="inherit" style={{ padding: "0px" }}>
            <Badge badgeContent={1} color="secondary">
              <NotificationsIcon fontSize="large" />
            </Badge>
          </IconButton>

          <Link
            component="button"
            variant="h5"
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
        <Container maxWidth="lg" className={classes.container}>
          {getFunctionContent(activeFunc)}
          {/*<EnrollingNewStudent />*/}
          {/*<div className="Card"><Upload value="استمارة ٦ جند" /></div>*/}
        </Container>
      </main>
      <Drawer
        variant="permanent"
        anchor="right"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
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
              <ListItemText style={{ textAlign: "right", color: "white" }}>
                إضافة طالب جديد
              </ListItemText>
            </ListItem>
            <ListItem button onClick={handleArmy}>
              <ListItemIcon>
                <NoteAddIcon
                  style={{ marginRight: "7%", color: "white" }}
                  fontSize="medium"
                />
              </ListItemIcon>
              <ListItemText style={{ textAlign: "right", color: "white" }}>
                تأجيل التجنيد العسكري
              </ListItemText>
            </ListItem>
          </div>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
