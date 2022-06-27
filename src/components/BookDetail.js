import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

const BookDetail = () => {
  const location = useLocation();

  return (
    <div className="card-detail-container ">
      <div className="card-detail row">
        <div className="child-detail">
          <img
            style={{ marginLeft: "25%" }}
            src={location.state.image}
            alt="bookimage"
            width="200"
            height="300"
          />
        </div>

        <div
          style={{ marginBottom: "25px", marginRight: "10%" }}
          className="child-detail"
        >
          <div
            style={{ fontWeight: "bold", fontSize: "30px" }}
            className="my-2"
          >
            {location.state.name}
          </div>
          <div>{location.state.author}</div>
          <div>{location.state.publisher}</div>
          <div
            style={{ fontWeight: "bold", fontSize: "25px", marginTop: "5px" }}
          >
            {location.state.price}₺
          </div>
          <div className="mt-5">
            <Button
              style={{ fontSize: "12px", padding: "10px" }}
              variant="outline-dark"
            >
              <img
                src={require("../assets/cart.png")}
                alt="..."
                width="15"
                height="15"
              />
              <span className="mx-1">Sepete Ekle</span>
            </Button>
            <Button
              style={{ fontSize: "12px", marginLeft: "15px", padding: "10px" }}
              variant="outline-dark"
            >
              <img
                src={require("../assets/heart.png")}
                alt="..."
                width="15"
                height="15"
              />
              <span className="mx-1">
                {!location.state.isFavorite
                  ? "Favorilere Ekle"
                  : "Favorilerden Çıkar"}
              </span>
            </Button>
          </div>

          <div style={{ fontSize: "12px" }} className="mt-4">
            <b>Standart Teslimat :</b> 01 Haziran - 03 Haziran
          </div>
          <div style={{ fontSize: "12px" }} className="mt-2">
            <img
              src={require("../assets/box.png")}
              alt="..."
              width="15"
              height="15"
            />
            100 TL ve üzeri siparişlerinizde kargo bedava!
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
