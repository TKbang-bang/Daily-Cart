import React from "react";
import { Link } from "react-router-dom";
import "./components.css";

function Product({ product }) {
  return (
    <article className="product">
      <img
        src={`${import.meta.env.VITE_SERVER_URL}/products/${product.image}`}
        alt={product.name}
      />
      <div className="info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="_price">
          {product.discount ? (
            <>
              <span className="red">${product.price}</span>
              <span className="price">${product.price - product.discount}</span>
            </>
          ) : (
            <span className="price">${product.price}</span>
          )}{" "}
        </p>
        <p>{product.stock} in stock</p>
      </div>

      <div className="btns">
        <button className="to_cart">Add to cart</button>
        <button className="now">Buy now</button>
      </div>
    </article>
  );
}

export default Product;
