import React from "react";
import { Button } from "react-bootstrap";
import {
  updateFavorite,
  updateCart,
  updateBookCount,
} from "../config/firebase";
import { useNavigate } from "react-router-dom";

const BookItem = ({ product }) => {
  const navigate = useNavigate();

  const goToBookDetail = (product) => {
    navigate("/bookdetail", { state: product });
  };

  const onHandleFavorite = (product) => {
    updateFavorite(product.isFavorite, product.id);
  };

  const onHandleBasket = (product) => {
    updateCart(product.isCart, product.id);
    updateBookCount(product.count, product.id, "firstadd");
  };

  return (
    <>
      <div
        onClick={() => {
          goToBookDetail(product);
        }}
        style={{ cursor: "pointer" }}
      >
        <img
          loading="lazy"
          src={product.image ?? ""}
          alt="bookimage"
          width="120"
          height="170"
        />
        <div style={{ fontWeight: "bold", fontSize: "16px" }} className="my-2">
          {product.name}
        </div>
        <div>{product.author}</div>
        <div>{product.publisher}</div>
        <div style={{ fontWeight: "bold", fontSize: "16px" }}>
          {`${product.price}₺`}
        </div>
      </div>

      <Button
        style={{ fontSize: "12px", marginBottom: "4px" }}
        variant="outline-dark"
        onClick={() => {
          onHandleBasket(product);
        }}
      >
        <img
          src={require("../assets/cart.png")}
          alt="..."
          width="15"
          height="15"
        />
        <span className="mx-1">
          {!product.isCart ? "Sepete Ekle" : "Sepetten Çıkar"}
        </span>
      </Button>
      <Button
        style={{ fontSize: "12px" }}
        variant="outline-dark"
        onClick={() => {
          onHandleFavorite(product);
        }}
      >
        <img
          src={require("../assets/heart.png")}
          alt="..."
          width="15"
          height="15"
        />
        <span className="mx-1">
          {!product.isFavorite ? "Favorilere Ekle" : "Favorilerden Çıkar"}
        </span>
      </Button>
    </>
  );
};

export default BookItem;
