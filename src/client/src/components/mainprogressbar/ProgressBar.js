import React from "react";
import PropTypes from "prop-types";
import "./progressBar.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import PersonIcon from "@material-ui/icons/Person"; //personal info
import SchoolIcon from "@material-ui/icons/School"; //thanaweya amma
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto"; //add photo
import RecentActorsOutlinedIcon from "@material-ui/icons/RecentActorsOutlined"; //id
import CakeSharpIcon from "@material-ui/icons/CakeSharp"; //birth
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined"; //nomination
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Upload from "../upload/Upload";
import MainForm from "../mainform/MainForm";
import { Container } from "semantic-ui-react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Zoom from "@material-ui/core/Zoom";
//import { CarouselCaption } from "reactstrap";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  active: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  completed: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center"
  },
  active: {
    color: "#784af4"
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18
  },
  paper: {
    padding: "20px",
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
    left: "calc(50% + 20px)",
    right: "calc(-50% + 20px)"
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(223,197,127) 0%,rgb(216,171,48) 50%,rgb(218,179,80)100%)"
    }
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(218,179,80) 0%,rgb(218,179,80) 50%,rgb(218,179,80) 100%)"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg,#CDAB50 0%, #CEA020 50%, #CB990F 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, #CDAB50 0%, #CEA020 50%, #CB990F 100%)"
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PersonIcon />,
    2: <DescriptionOutlinedIcon />,
    3: <SchoolIcon />,
    4: <CakeSharpIcon />,
    5: <RecentActorsOutlinedIcon />,
    6: <AddAPhotoIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

const useStyles = makeStyles(theme => ({
  root: {
    direction: "rtl",
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1),
    backgroundColor: "#003366",
    color: "white"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return [
    "البيانات الشخصية",
    "بطاقة الترشيح",
    "شهادة الثانوية العامة",
    "شهادة الميلاد",
    "البطاقة الشخصية",
    "الصور الشخصية"
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <MainForm />;
    case 1:
      return (
        <div className="Card">
          <Upload value="بطاقة الترشيح" />
        </div>
      );
    case 2:
      return (
        <div className="Card">
          <Upload value=" شهادة الثانوية العامة" />
        </div>
      );
    case 3:
      return (
        <div className="Card">
          <Upload value="شهادة الميلاد" />
        </div>
      );
    case 4:
      return (
        <div className="Card">
          <Upload value="البطاقة الشخصية" />
        </div>
      );
    case 5:
      return (
        <div className="Card">
          <Upload value="الصور الشخصية" />
        </div>
      );
    default:
      return "Unknown step";
  }
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <div className="progress-bar">
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <span className="progress-bar-labels">{label}</span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              تمت إضافة طالب جديد بنجاح
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              إعادة
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              رجوع
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? "حفظ" : "استمرار"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
