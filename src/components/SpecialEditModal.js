import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { updateSpecialBook } from "../config/firebase";

const SpecialEditModal = ({ showEditModal, handleClose, product }) => {
  const [values, setValues] = useState(product);

  useEffect(
    () =>
      setValues((oldValues) => ({
        ...oldValues,
        name: product.name,
        author: product.author,
        publisher: product.publisher,
        id: product.id,
      })),
    [product]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleModalUpdate = () => {
    updateSpecialBook(values, values.id);
    handleClose();
  };

  return (
    <div>
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Güncelle</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kitap Adı</Form.Label>
              <Form.Control
                placeholder="Giriniz"
                value={values.name}
                onChange={handleChange}
                name="name"
                size="sm"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Yazar</Form.Label>
              <Form.Control
                placeholder="Giriniz"
                value={values.author}
                onChange={handleChange}
                name="author"
                size="sm"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Publisher</Form.Label>
              <Form.Control
                placeholder="Giriniz"
                value={values.publisher}
                onChange={handleChange}
                name="publisher"
                size="sm"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleModalUpdate} size="sm">
            Güncelle
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default SpecialEditModal;
