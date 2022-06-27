import { Toast } from "react-bootstrap";
import React from "react";

const SpecialToastMessage = ({ show, setShow }) => {
  return (
    <div className="toast-message">
      <Toast
        className="d-inline-block m-1"
        bg="dark"
        onClose={() => setShow(false)}
        show={show}
        delay={2000}
        autohide
      >
        <Toast.Body className="text-white">Yeni kitap eklendi.</Toast.Body>
      </Toast>
    </div>
  );
};
export default SpecialToastMessage;
