import { useProductsListener } from "../config/firebase";
import BookItem from "./BookItem";

const MyFavorites = () => {
  const products = useProductsListener();
  const favorites = products.filter((item) => item.isFavorite);

  return (
    <div className="card-container">
      {favorites.map((product) => (
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

export default MyFavorites;
