import React from "react";
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
import Alerts from "../alert/Alert";
import CloseIcon from "@material-ui/icons/Close";
import Zoom from "@material-ui/core/Zoom";
import { getToken } from "../../Utils/Common";
import { getProgramss } from "../../core/Apis";

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
  const [programs2, setPrograms2] = React.useState([]);
  const values = {
    alertNumber: 1,
    alertMessage: "Hey Ass",
  };

  const programs = [
    { id: 1, value: "Foundation Year" },
    { id: 2, value: "Computer and Communication Engineering" },
    { id: 3, value: " Architecture and Construction Engineering" },
    { id: 4, value: "Electromechanical Engineering" },
    { id: 5, value: "Gas And Petrochemicals Engineering" },
  ];

  const handleChange = (event) => {
    document.getElementById("program-alert").style.display = "block";
  };

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
        setPrograms2(...data);
        console.log("programs222222!!!!!!");
        console.log(programs2);
      }
    });
  };

  const handleClickOpen = () => {
    getPrograms();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    document.getElementById("blur").style.filter = "blur(0)";
  };

  const handleEnter = () => {
    document.getElementById("blur").style.filter = "blur(8px)";
  };

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
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
                style={{ fontFamily: "Cairo" }}
              >
                <option aria-label="None" value="" />
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.value}
                  </option>
                ))}
              </Select>
              <div id="program-alert">
                <Alerts variant="outlined" severity="success" values={values} />
              </div>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions id="dialog-select-buttons">
          {/*<Button onClick={handleClose} color="primary">
            Cancel
                </Button>*/}
          <Button id="ok-select-button" onClick={handleClose} color="primary">
            تم
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
