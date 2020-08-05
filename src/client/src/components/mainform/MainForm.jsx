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
    disabled: true,
    progressDisabled: true,
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
    this.setState({ [input]: event.target.value }, () => {
      console.log("Name");
      console.log(this.state.name);
      console.log("Email");
      console.log(this.state.email);
      console.log("Admin");
      console.log(this.state.admin);
      if (
        this.state.namear == "" ||
        this.state.ssn == "" ||
        this.state.email == "" ||
        this.state.gender == "" ||
        this.state.address == "" ||
        this.state.phonenumber == "" ||
        this.state.nationality == "" ||
        this.state.parentname == "" ||
        this.state.parentssn == "" ||
        this.state.parentrelation == "" ||
        this.state.birthdate == "" ||
        this.state.medicalcondition == "" ||
        this.state.parentphone == "" ||
        this.state.selection == ""
      ) {
        console.log("in THEN disabled .... TRUE");
        this.setState({ disabled: true }, () => {
          console.log(this.state.disabled);
        });
      } else {
        console.log("in ELSE disabled .... FALSE");
        this.setState({ disabled: false }, () => {
          console.log(this.state.disabled);
        });
      }
    });
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
            disabled={this.state.disabled}
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
