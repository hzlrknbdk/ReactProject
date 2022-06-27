import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";

import { useState } from "react";
import { signIn } from "../config/firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bestsellers from "./Bestsellers";
import NewReleases from "./NewReleases";
import MyFavorites from "./MyFavorites";
import Pricing from "./Pricing";
import Books from "./Books";
import BookDetail from "./BookDetail";
import MySpecialLibrary from "./MySpecialLibrary";

function NavbarComponent() {
  const [show, setShow] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const [formValue, setValue] = useState({ email: "", password: "" });

  const handleClose = () => {
    setShow(false);
    setSuccess(false);
    setAlert(false);
  };

  const handleShow = () => {
    if (isSuccess) return;
    setShow(true);
    setValue({ email: "", password: "" });
  };

  const handleSubmit = () => {
    setShow(false);
    signIn(formValue.email, formValue.password)
      .then((data) => {
        console.log({ data: data.idToken });
        setSuccess(true);
        setMessage();
      
      })
      .catch(() => {
        setSuccess(false);
        setMessage();
      });
  };

  const onChange = (e) => {
    setValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const setMessage = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  return (
    <>
      <Router>
        <Navbar bg="light" variant="light ">
          <Container>
            <Navbar.Brand href="/">Adesso's Library</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="bestsellers">Çok Satanlar</Nav.Link>
              <Nav.Link href="newreleases">Yeni Çıkanlar</Nav.Link>
              <Nav.Link href="myfavorites">Favori Listem</Nav.Link>
              <Nav.Link href="myspeciallist">Özel Listem</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={handleShow}>
                {isSuccess ? "Hoşgeldin" : "Giriş Yap"}
              </Nav.Link>
              <Nav.Link href="pricing">Sepetim</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/bestsellers" element={<Bestsellers />} />
          <Route path="/newreleases" element={<NewReleases />} />
          <Route path="/myfavorites" element={<MyFavorites />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/bookdetail" element={<BookDetail />} />
          <Route path="/myspeciallist" element={<MySpecialLibrary />} />
        </Routes>
      </Router>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Giriş Yap</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form value={formValue}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={formValue.email}
                onChange={onChange}
                name="email"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                type="password"
                placeholder="Şifre"
                value={formValue.password}
                onChange={onChange}
                name="password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleSubmit} size="sm">
            Giriş
          </Button>
        </Modal.Footer>
      </Modal>
      <Alert
        className="alert"
        variant={isSuccess ? "success" : "danger"}
        show={showAlert}
      >
        {isSuccess ? "Success!" : "Danger!"}
      </Alert>
    </>
  );
}

export default NavbarComponent;
