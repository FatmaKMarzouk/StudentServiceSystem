import React, { useEffect } from "react";
import "./dialog.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import Zoom from "@material-ui/core/Zoom";
import { getToken } from "../../Utils/Common";
import { getProgramss, submitChosenProgram } from "../../core/Apis";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in="checked" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
}));

export default function DialogSelect() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  var [selectedProgram, setSelectedProgram] = React.useState();
  var [programs2, setPrograms2] = React.useState([]);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("");

  const programs = [
    { id: 1, value: "Foundation Year" },
    { id: 2, value: "Computer and Communication Engineering" },
    { id: 3, value: " Architecture and Construction Engineering" },
    { id: 4, value: "Electromechanical Engineering" },
    { id: 5, value: "Gas And Petrochemicals Engineering" },
  ];

  //const handleChange = (event) => {
  //console.log("AHAM VALUE");
  //console.log(event.target.value);
  //setSelectedProgram(event.target.value);
  //console.log("AHAM Selected Value");
  //console.log(selectedProgram);

  //document.getElementById("program-alert").style.display = "block";
  //};

  const getPrograms = () => {
    const token = getToken();
    console.log(token);
    getProgramss(token).then((data) => {
      if (data.error) {
        console.log("IN ERORRR GET PROGRAMS:: ");
        console.log(data.message);
      } else {
        console.log("IN ELSEEE DATA GETPROGRAMS:: ");
        console.log(data);
        setPrograms2(data);
        console.log("programs222222!!!!!!");
        console.log(programs2);

        programs2.forEach((item, i) => {
          item.id = i + 1;
        });

        console.log("programs222222 INDEX!!!!!!");
        console.log(programs2);
      }
    });
  };

  const handleClickOpen = () => {
    //getPrograms();
    setOpen(true);
  };

  const handleClose = () => {
    //console.log("HEREEEE");
    //console.log(selectedProgram);
    setOpen(false);
    document.getElementById("blur").style.filter = "blur(0)";
  };

  const handleSubmit = () => {
    //lama ados 3ala tammmm
    const token = getToken();
    console.log(token);
    console.log("1");
    console.log(selectedProgram);
    submitChosenProgram(token, selectedProgram).then((data) => {
      if (data.error) {
        console.log("IN ERORRR GET PROGRAMS:: ");
        console.log(data.message);
        setAlertMessage(data.message);
        setAlertSeverity("error");
      } else {
        console.log("IN ELSEEE DATA GETPROGRAMS:: ");
        console.log(data.message);
        setAlertMessage(data.message);
        setAlertSeverity("success");
      }
    });
    document.getElementById("program-alert").style.display = "block";
  };

  const handleEnter = () => {
    document.getElementById("blur").style.filter = "blur(8px)";
  };

  useEffect(() => {
    getPrograms();
  }, [open]);

  return (
    <div>
      <Button id="inside-paper-button" onClick={handleClickOpen}>
        المزيد
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        onEntering={handleEnter}
      >
        <DialogTitle id="select-program-title-container">
          <span id="select-program-title"> اختيار البرنامج</span>
          <Button id="close-select-button" onClick={handleClose}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent id="dialog-select-content">
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="demo-dialog-native"
                style={{ fontFamily: "Cairo" }}
              >
                البرنامج
              </InputLabel>
              <Select
                native
                onChange={(e) => setSelectedProgram(e.target.value)}
                input={<Input id="demo-dialog-native" />}
                style={{ fontFamily: "Cairo" }}
              >
                <option aria-label="None" value="" />
                {programs2.map((program) => (
                  <option key={program.id}>{program.Name}</option>
                ))}
              </Select>
              <div id="program-alert">
                <Alert variant="outlined" severity={alertSeverity}>
                  {alertMessage}
                </Alert>
              </div>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions id="dialog-select-buttons">
          {/*<Button onClick={handleClose} color="primary">
            Cancel
                </Button>*/}
          <Button id="ok-select-button" onClick={handleSubmit} color="primary">
            تم
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
