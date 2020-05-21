import React, { useState, useEffect } from "react";
import "./dialog.css";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Confirmation from "../mainform/Confirmation";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Zoom from "@material-ui/core/Zoom";
import { readCertOfEnrollData, certificateToCart, transcriptCart } from "../../core/Apis";
import { getUser, getToken } from "../../Utils/Common";
import axios from "axios";
import Upload from "../upload/Upload";
import { Hidden } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in="checked" ref={ref} {...props} />;
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
    position: "absolute",
    right: 0,
    bottom: 0,
    marginRight: "4%",
    marginBottom: "4%",
    marginTop: "10%",
  },
  dialogButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    marginRight: "4%",
    marginBottom: "4%",
    marginTop: "10%",
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 150,
    width: 250,
    margin: "0 auto",
    backgroundColor: "white",
  },
  paperWidth: {
    maxWidth: "800px",
    width: "auto",
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function getConfirmationTitle(num) {
  switch (num) {
    case 0:
      return;
    case 1:
      return <h2 style={{ float: "right", fontWeight: "bold" }}>شهادة قيد</h2>;
    case 2:
      return (
        <h2 style={{ float: "right", fontWeight: "bold" }}>
          ترانسكريبت المواد
        </h2>
      );
    case 3:
      return (
        <h2 style={{ float: "right", fontWeight: "bold" }}>الكارنية الجامعي</h2>
      );
    case 4:
      return (
        <h2 style={{ float: "right", fontWeight: "bold" }}>شهادة إفادة</h2>
      );
    default:
      return <p> wala title</p>;
  }
}

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  /*const [userData, setUserData] = useState({
    NameAr: "",
    Faculty: "",
    CollegeName: "جامعة الأسكندرية",
    CollegeYear: "سنة رابعة",
    Program: "",
    EnrollmentStatus: "طالبة في كلية الهندسة جامعة الأسكندرية",
    GPA: "",
  });
*/

  //-------------------------------------------------------------------------------
  /*
  useEffect(function getValues() {
    setError(null);
    setLoading(true);
    axios
      .get("http://localhost:5000/certificateofenrollment")
      .then((response) => {
        response.json();
        setLoading(false);
        console.log("data");
        console.log(response.data);

        //userData = username.value,
        //handleUserData(response.data);
        //setUserData(response.data);

        //console.log("user data");
        //console.log(userData);
        //handleClickOpen();
      })
      .then(({ data: userData }) => {
        console.log("user Data 1");
        setUserData(userData);
        console.log("user Data 2");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  }, []);
*/
  /*const getValues = () => {
    //cases l kol id
    switch (props.id) {
      case 1:
        setError(null);
        setLoading(true);
        axios
          .get("http://localhost:5000/certificateofenrollment")
          .then((response) => {
            setLoading(false);
            console.log("data");
            console.log(response.data);
            
            //userData = username.value,
            //handleUserData(response.data);
            //setUserData(response.data);
            console.log("user data");
            console.log(userData);
            handleClickOpen();

            //props.history.push("/home");
          })
          .catch((error) => {
            setLoading(false);
            if (error.response.status === 401)
              setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
          });
    }
  };
*/
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {

    const token = getToken();

    switch (props.id)
    {
      case 1:
        certificateToCart(token);
      case 2:
        transcriptCart(token);
    }
    setOpen(false);
    document.getElementById("blur").style.filter = "blur(0)";
  };

  const handleEnter = () => {
    document.getElementById("blur").style.filter = "blur(8px)";
  };

  const handleWidth = () => {
    if (props.id == 1) {
      document.getElementById("dialog-content").style.width = "600px";
    }
  };

  const classes = useStyles();

  const values = {
    fullName: "سارة يسري عبد الحميد حسن صقر",
    facultyName: "هندسة",
    collegeName: "جامعة الأسكندرية",
    collegeYear: "سنة رابعة",
    collegeProgram: "كمبيوتر و إتصلات",
    enrollmentStatus: "طالبة في كلية الهندسة جامعة الأسكندرية",
    gpa: "٤.٠",
    enrollmentDestination: "السفارة اليونانية",

    courses: [
      {
        semester: "Fall 2015-2016",
        courseCode: "MP103 N",
        courseName: "Mechanics-1",
        creditHours: "3",
        grade: "A+",
      },
      {
        semester: "Fall 2015-2016",
        courseCode: "MP103 N",
        courseName: "Mechanics-1",
        creditHours: "3",
        grade: "B+",
      },
      {
        semester: "Fall 2015-2016",
        courseCode: "MP103 N",
        courseName: "Mechanics-1",
        creditHours: "3",
        grade: "C+",
      },
      {
        semester: "Fall 2015-2016",
        courseCode: "MP103 N",
        courseName: "Mechanics-1",
        creditHours: "3",
        grade: "A+",
      },
      {
        semester: "Fall 2015-2016",
        courseCode: "MP103 N",
        courseName: "Mechanics-1",
        creditHours: "3",
        grade: "B+",
      },
      {
        semester: "Fall 2015-2016",
        courseCode: "MP103 N",
        courseName: "Mechanics-1",
        creditHours: "3",
        grade: "A-",
      },
      {
        semester: "Spring 2015-2016",
        courseCode: "MP103 N",
        courseName: "Mechanics-1",
        creditHours: "3",
        grade: "D+",
      },
      {
        semester: "Spring 2015-2016",
        courseCode: "MP103 N",
        courseName: "Mechanics-1",
        creditHours: "3",
        grade: "C+",
      },
      {
        semester: "Spring 2015-2016",
        courseCode: "MP103 N",
        courseName: "Mechanics-1",
        creditHours: "3",
        grade: "A+",
      },
      {
        semester: "Spring 2015-2016",
        courseCode: "MP103 N",
        courseName: "Mechanics-1",
        creditHours: "3",
        grade: "B-",
      },
      {
        semester: "Spring 2015-2016",
        courseCode: "MP103 N",
        courseName: "Mechanics-1",
        creditHours: "3",
        grade: "A+",
      },
      {
        semester: "Spring 2015-2016",
        courseCode: "MP103 N",
        courseName: "Mechanics-1",
        creditHours: "3",
        grade: "D-",
      },
    ],
  };

  return (
    <div>
      <Button id="inside-paper-button" onClick={handleClickOpen}>
        المزيد
      </Button>
      <div id="dialog-background">
        <Dialog
          onClose={handleClose}
          //aria-labelledby="customized-dialog-title"
          open={open}
          //id="dialog-box"
          //maxWidth={"false"}
          classes={{ paperWidthSm: classes.paperWidth }}
          fullWidth
          TransitionComponent={Transition}
          onEntering={handleEnter}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <div className="service-title-container">
              {getConfirmationTitle(props.id)}
              <span
                style={{
                  fontSize: "12px",
                }}
              >
                يرجى التأكد من صحة البيانات المدخلة
              </span>
              <span
                style={{
                  fontSize: "12px",
                }}
              >
                ( ثم أضف إلى العربة )
              </span>
            </div>
          </DialogTitle>
          <DialogContent id="dialog-content">
            <Typography>
              {console.log(`dialogBox id ${props.id}`)}
              <Confirmation id={props.id} values={values} />
              {/*<Upload value="بطاقة ٦ جند" />*/}
            </Typography>
          </DialogContent>
          <DialogActions style={{ padding: "2%" }}>
            <Button
              id="add-to-cart-button"
              autoFocus
              onClick={handleClose}
              color="primary"
              style={{ marginRight: "auto" }}
            >
              <AddShoppingCartIcon />
              <span style={{ marginLeft: "5%" }}>أضف إلى العربة</span>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
