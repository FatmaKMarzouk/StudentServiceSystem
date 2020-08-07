// MainForm.jsx
import React, { Component } from "react";
import UserDetails from "./UserDetails";
//import PersonalDetails from "./PersonalDetails";
import Confirmation from "./Confirmation";
import Success from "./Success";

class MainForm extends Component {
  state = {
    step: 1,
    namear: "",
    ssn: "",
    email: "",
    gender: "",
    address: "",
    phonenumber: "",
    nationality: "",
    parentname: "",
    parentssn: "",
    parentrelation: "",
    birthdate: "",
    medicalcondition: "",
    parentphone: "",
    selection: "",
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  render() {
    const { step } = this.state;
    const {
      namear,
      ssn,
      email,
      gender,
      address,
      phonenumber,
      nationality,
      parentname,
      parentssn,
      parentrelation,
      birthdate,
      medicalcondition,
      parentphone,
      selection,
    } = this.state;
    const values = {
      id: 0,
      namear,
      ssn,
      email,
      gender,
      address,
      phonenumber,
      nationality,
      parentname,
      parentssn,
      parentrelation,
      birthdate,
      medicalcondition,
      parentphone,
      selection,
    };
    switch (step) {
      case 1:
        return (
          <UserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <Confirmation
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            id={0}
          />
        );
      case 3:
        return <Success />;
      default:
        return;
    }
  }
}

export default MainForm;
