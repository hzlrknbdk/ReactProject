import BookItem from "./BookItem";
import { useProductsListener } from "../config/firebase";

const Books = () => {
  const products = useProductsListener();

  return (
    <div className="card-container">
      {products.map((product) => (
        <div
          key={product.id}
          className="card justify-content-between align-items-center"
        >
          <BookItem product={product} />
        </div>
      ))}
    </div>
  );
};

export default Books;
