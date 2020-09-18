import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "./axios";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";

function Payment() {
  const [state, dispatch] = useStateValue();
  const basket = state?.basket;
  const user = state?.user;

  const history = useHistory();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      //   const totalAmount = getBasketTotal(basket) * 100;
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        // For dollars it means cents, so multiply by 100
        url: `payment/create?total=${Math.ceil(getBasketTotal(basket) * 100)}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const stripe = useStripe();
  const elements = useElements();

  console.log("THE SECRET IS >>> ", clientSecret);
  console.log("👨‍💻", user);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      const paymentIntent = payload.paymentIntent;

      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type: "EMPTY_BASKET",
      });

      history.replace("/orders");
    } catch (error) {
      console.log(error);

      setSucceeded(false);
      setError(error.message);
      setProcessing(false);
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Payment Section - Delivery Address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>AlMalqa</p>
            <p>Riyadh, Saudi Arabia</p>
          </div>
        </div>

        {/* Payment Section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket?.map((basketItem) => {
              return (
                <CheckoutProduct
                  id={basketItem.id}
                  title={basketItem.title}
                  imageUrl={basketItem.imageUrl}
                  price={basketItem.price}
                  rating={basketItem.rating}
                />
              );
            })}
          </div>
        </div>

        {/* Payment Section - Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
