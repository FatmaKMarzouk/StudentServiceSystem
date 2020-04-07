// MainForm.jsx
import React, { Component } from "react";
import UserDetails from "./UserDetails";
import PersonalDetails from "./PersonalDetails";
import Confirmation from "./Confirmation";
import Success from "./Success";
import axios from 'axios';

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
    guardianPhoneNumber: ""
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  handleSubmit = event =>{

    event.preventDefault();
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
      guardianPhoneNumber
    } = this.state;
    const info = { fullName,nationalId,  email,gender,address,phoneNumber,nationality,guardianName,guardianId,relativeRelation,birthDate,medicalCondition,guardianPhoneNumber};
    
    fetch('http://localhost:5000/enroll',info)
    .then(() => console.log('Info Sent'))
    .catch(err => {
        console.error(err);
      });
  };

  render() {
    const {
      step,
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
      guardianPhoneNumber
    } = this.state;
    const values = {
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
      guardianPhoneNumber
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
            values={{ id: 0 }}
          />
        );
      case 3:
        return <Success />;
    }
  }
}

export default MainForm;
