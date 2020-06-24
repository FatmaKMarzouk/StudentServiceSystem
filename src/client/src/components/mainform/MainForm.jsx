// MainForm.jsx
import React, { Component } from "react";
import UserDetails from "./UserDetails";
//import PersonalDetails from "./PersonalDetails";
import Confirmation from "./Confirmation";
import Success from "./Success";

class MainForm extends Component {
  state = {
    step: 1,
    fullName: "",
    nationalId: "",
    email: "",
    gender: "",
    address: "",
    phoneNumber: "",
    nationality: "",
    guardianName: "",
    guardianId: "",
    relativeRelation: "",
    birthDate: "",
    medicalCondition: "",
    guardianPhoneNumber: "",
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
      fullName,
      nationalId,
      email,
      gender,
      address,
      phoneNumber,
      nationality,
      guardianName,
      guardianId,
      relativeRelation,
      birthDate,
      medicalCondition,
      guardianPhoneNumber,
    } = this.state;
    const values = {
      id: 0,
      fullName,
      nationalId,
      email,
      gender,
      address,
      phoneNumber,
      nationality,
      guardianName,
      guardianId,
      relativeRelation,
      birthDate,
      medicalCondition,
      guardianPhoneNumber,
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
