import {
  useProductsListener,
  updateCart,
  updateBookCount,
} from "../config/firebase";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

const Pricing = () => {
  const [totalCount, setTotalCount] = useState(0);
  
  const products = useProductsListener();
  const carts = products.filter((item) => item.isCart);

  const incCount = (count, id) => {
    updateBookCount(count, id, "inc");
  };

  const descCount = (count, id) => {
    updateBookCount(count, id, "desc");
  };

  const deleteToBasket = (product) => {
    updateCart(product.isCart, product.id);
    updateBookCount(product.count, product.id, "none");
  };

  useEffect(() => {
    const counts = [];
    products.forEach((f) => {
      if (f.isCart) {
        counts.push(f.count * f.price);
        const reducer = (accumulator, curr) => accumulator + curr;
        setTotalCount(counts.reduce(reducer));
      }
    });
  }, [products]);

  return (
    <div className="box-container row">
      <div className="box-card">
        <Table borderless>
          <thead>
            <tr>
              <th></th>
              <th>Kitap </th>
              <th>Miktar</th>
              <th>Birim Fiyat</th>
              <th>Toplam</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {carts.map((product) => (
              <tr>
                <td>
                  <img
                    src={product.image}
                    alt="bookimage"
                    width="50"
                    height="70"
                  />
                </td>
                <td>
                  <div
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    className="font-weight:bold"
                  >
                    {product.name}
                  </div>
                  <div className="my-2">{product.author}</div>
                </td>
                <td>
                  <div className="box-count">
                    <Button
                      style={{
                        marginRight: "10px",
                      }}
                      variant="outline-dark"
                      size="sm"
                      onClick={() => {
                        descCount(product.count, product.id);
                      }}
                    >
                      -
                    </Button>
                    <div className="mt-2">{product.count}</div>
                    <Button
                      style={{
                        marginLeft: "10px",
                      }}
                      variant="outline-dark"
                      size="sm"
                      onClick={() => {
                        incCount(product.count, product.id);
                      }}
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td>
                  <div className="mt-2">{`${product.price}₺`}</div>
                </td>
                <td>
                  <div className="mt-2">{`${
                    product.price * product.count
                  }₺`}</div>
                </td>
                <td>
                  <Button
                    style={{
                      marginLeft: "10px",
                    }}
                    variant="outline-dark"
                    size="sm"
                    onClick={() => {
                      deleteToBasket(product);
                    }}
                  >
                    Sil
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div
          style={{
            fontSize: "15px",
          }}
          className="mt-5"
        >
          <b>TOPLAM: </b>
          {`${totalCount}₺`}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
