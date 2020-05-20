var cart = require('./cart');  //fatma zawedet el satreen dool
var session = require('express-session');
const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var total = cart.total;
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());
var connection = require('../controllers/dbconnection');


module.exports = router;
const { resolve } = require("path");
// Replace if using a different env file or config
var env = require("dotenv").config({ path: __dirname + "../.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



router.get("/checkout", (req, res) => {
  // Display checkout page
  //res.sendFile(__dirname+'/client/index.html');
});

router.get("/stripe-key", (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // You should always calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return total;
};

router.post("/pay", async (req, res) => {
  if(request.session.loggedin){
  var username = request.session.username;
  const { paymentMethodId, paymentIntentId, items, currency, useStripeSdk } = req.body;

  const orderAmount = calculateOrderAmount(items);

  try {
    let intent;
    if (paymentMethodId) {
      // Create new PaymentIntent with a PaymentMethod ID from the client.
      intent = await stripe.paymentIntents.create({
        amount: orderAmount,
        currency: currency,
        payment_method: paymentMethodId,
        confirmation_method: "manual",
        confirm: true,
        // If a mobile client passes `useStripeSdk`, set `use_stripe_sdk=true`
        // to take advantage of new authentication features in mobile SDKs
        use_stripe_sdk: useStripeSdk,
      });
      // After create, if the PaymentIntent's status is succeeded, fulfill the order.
    } else if (paymentIntentId) {
      // Confirm the PaymentIntent to finalize payment after handling a required action
      // on the client.
      intent = await stripe.paymentIntents.confirm(paymentIntentId);
      // After confirm, if the PaymentIntent's status is succeeded, fulfill the order.
    }
    res.send(generateResponse(intent));
  } catch (e) {
    // Handle "hard declines" e.g. insufficient funds, expired card, etc
    // See https://stripe.com/docs/declines/codes for more
    res.send({ error: e.message });
  }
}
else{
  response.send("Please log in to view this page!");
}
});

const generateResponse = intent => {
  // Generate a response based on the intent's status
  switch (intent.status) {
    case "requires_action":
    case "requires_source_action":
      // Card requires authentication
      return {
        requiresAction: true,
        clientSecret: intent.client_secret
      };
    case "requires_payment_method":
    case "requires_source":
      // Card was not properly authenticated, suggest a new payment method
      return {
        error: "Your card was denied, please provide a new payment method"
      };
    case "succeeded":
      var date = dateFormat(new Date(),"yyyy-mm-dd");
      connection.query('USE AlexUni');
      connection.query('UPDATE Requests SET Paid = "1", DatePaid =? WHERE ID =?',[date,username]);
      // Payment is complete, authentication not required
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
      console.log("💰 Payment received!");
      return { clientSecret: intent.client_secret };
  }
};
