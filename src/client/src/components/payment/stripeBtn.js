import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { getToken } from "../../Utils/Common";
var amount;

const stripeBtn = () => {
  const publishableKey = "pk_test_51Gy0PkBVIbnFGJuVSUf8sC63Hu0bWLG3P6A1CkfuGSkomQfbDnz6mRSCGqgyaOQxqlYr1oPLjH3AgFynDxsvHJoy00JzuWWpKh";
  const token = getToken();
  const total = sessionStorage.getItem('total');
  const onToken = token => {
    const body = {
      amount: total,
      token: token
  };


  fetch("http://localhost:5000/payment", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      console.log("payment api response");
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));


  /*axios
      .post("http://localhost:5000/payment",body)
      .then(response => {
        console.log(response);
        alert("Payment Success");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };*/

  return (
    <StripeCheckout
      amount={amount} //Amount in cents
      token={onToken}
      stripeKey={publishableKey}

    />
  );
};
export default stripeBtn;
