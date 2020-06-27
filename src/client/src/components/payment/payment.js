import React, { Component } from "react";
import logo from "../../logo.svg";
import "../../App.css";
import StripeBtn from "./stripeBtn";

function payment(props){

  return (
        <div className="App">
          <header className="App-header">
            
            <p>Payment Method</p>
            <StripeBtn />
          </header>
        </div>
        );
}

export default payment;
