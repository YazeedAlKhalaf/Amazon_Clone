const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(functions.config().stripe.secret_key);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API route
app.get("/", (req, res, next) => {
  res.status(200).send("hello world");
});

app.post("/payment/create", async (req, res, next) => {
  try {
    const total = req.query.total;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // in subunits of the currecny
      currency: "usd",
    });

    console.log("Payment Request Received BOOM!!! for this amount >>> ", total);

    // OK - Created
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
  }
});

// - Listen command
exports.api = functions.https.onRequest(app);
