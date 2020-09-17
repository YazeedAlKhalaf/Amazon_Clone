import React from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Checkout.css";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout__ad"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJhGUsjGncX7C0yfEdbnw773G0DrJWIvwBeQ&usqp=CAU"
          alt="checkout banner ad"
        />
        <div>
          <h2 className="checkout__title">Your Shopping Basket</h2>
          {basket.map((basketItem) => {
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

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
