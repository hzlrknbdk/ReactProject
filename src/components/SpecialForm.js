import { Form, Button } from "react-bootstrap";
import { createSpecialLibrary } from "../config/firebase";
import { useFormik, } from "formik";
import SpecialToastMessage from "./SpecialToastMessage";
import { useState } from "react";

const SpecialForm = () => {
  const [show, setShow] = useState(false);

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: "",
      author: "",
      publisher: "",
    },
    onSubmit: (values, { resetForm }) => {
      createSpecialLibrary(values);
      resetForm({ name: "", author: "", publisher: "", image: "" });
      setShow(true);
    },
  });

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Kitap Adı </Form.Label>
          <Form.Control
            size="sm"
            name="name"
            value={values.name}
            onChange={handleChange}
            required={true}
          />
          <br />
          <Form.Label>Yazar </Form.Label>
          <Form.Control
            size="sm"
            name="author"
            value={values.author}
            onChange={handleChange}
            required={true}
          />
          <br />
          <Form.Label>Yayınevi </Form.Label>
          <Form.Control
            size="sm"
            name="publisher"
            value={values.publisher}
            onChange={handleChange}
            required={true}
          />
          <br />
        </Form.Group>
        <Button variant="dark" type="submit" size="sm">
          Kitap Ekle
        </Button>
      </Form>
      
      <SpecialToastMessage show={show} setShow={setShow} />

    </div>
  );
};
export default SpecialForm;
