import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { deleteUser, useSpecialListListener } from "../config/firebase";
import SpecialEditModal from "./SpecialEditModal";

const MySpecialList = () => {
  const special = useSpecialListListener();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    author: "",
    publisher: "",
    id: "",
  });

  const onDeleteBook = (product) => {
    deleteUser(product.id);
  };

  const onUpdateBook = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleClose = () => {
    setShowEditModal(false);
  };

 
  return (
    <div className="special-table">
      <Table striped>
        <thead>
          <tr>
            <th>Kitap Adı</th>
            <th>Yazar</th>
            <th>Yayınevi</th>
          </tr>
        </thead>
        <tbody>
          {special.map((product) => (
            <tr>
              <td>{product.name}</td>
              <td>{product.author}</td>
              <td>{product.publisher}</td>
              <td className="table-action-icon">
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={() => {
                    onUpdateBook(product);
                  }}
                >
                  <img
                    src={require("../assets/edit.png")}
                    alt="..."
                    width="15"
                    height="15"
                  />
                </Button>
                <Button
                  style={{
                    marginLeft: "10px",
                  }}
                  variant="outline-dark"
                  size="sm"
                  onClick={() => {
                    onDeleteBook(product);
                  }}
                >
                  <img
                    src={require("../assets/delete.png")}
                    alt="..."
                    width="15"
                    height="15"
                  />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <SpecialEditModal
        showEditModal={showEditModal}
        handleClose={handleClose}
        product={selectedProduct}
      />
    </div>
  );
};
export default MySpecialList;
