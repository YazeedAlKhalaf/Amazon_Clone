import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, imageUrl, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // dispatch item into the Data Layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        imageUrl: imageUrl,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => {
              return <p>⭐</p>;
            })}
        </div>
      </div>

      <img src={imageUrl} alt={title} />
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Product;
