import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";

class Alerts extends Component {
  getAlert(alertNum, alertMess) {
    switch (alertNum) {
      case 0:
        return (
          <div>
            <Alert variant="outlined" severity="error">
              This is an error alert — check it out!
              {/*alertMess*/}
            </Alert>
          </div>
        );
      case 1:
        return (
          <div>
            <Alert variant="outlined" severity="success">
              This is a success alert — check it out!
              {/*alertMess*/}
            </Alert>
          </div>
        );
      default:
        return "Unknown Alert";
    }
  }
  render() {
    const {
      values: { alertNumber, alertMessage },
    } = this.props;

    return <div>{this.getAlert(alertNumber, alertMessage)}</div>;
  }
}

export default Alerts;

/*const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

function getAlert(alertNum, alertMess) {
  switch (alertNum) {
    case 0:
      return (
        <div>
          <Alert variant="outlined" severity="error">
            This is an error alert — check it out!
            {alertMess}
          </Alert>
        </div>
      );
    case 1:
      return (
        <div>
          <Alert variant="outlined" severity="success">
            This is a success alert — check it out!
            {alertMess}
          </Alert>
        </div>
      );
    default:
      return "Unknown Alert";
  }
}

export default function SimpleAlerts() {
  const classes = useStyles();
  const {
    values: { alertNumber, alertMessage }
  } = props;
  return (
    <div className={classes.root}>{getAlert(alertNumber, alertMessage)}</div>
  );
}*/
