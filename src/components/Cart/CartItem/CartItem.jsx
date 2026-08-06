import { useCart } from "../../../context/CartContextReducer";
import "./cartitem.scss";

const CartItem = ({ car }) => {
  const { removeFromCard } = useCart();

  return (
    <div className="cart-item">
      <div className="cart__img-wrapper">
        <img
          style={{ maxWidth: "250px" }}
          src={car.otherImages}
          alt="car-image"
        />
      </div>
      <div className="info-and-status">
        <div className="cart-info">
          <div className="remove-cart">
            <h1>{`${car.name} '${car.year}`}</h1>
          </div>
          <h2>
            {`${car.engine} L ${car.stage} • ${car.horsepower} л.c. • ${car.otherDrive} привод`}
          </h2>
          <h3>{`Цвет: ${car.color} • Салон: ${car.salon}`}</h3>
        </div>
        <div className="status-info">
          <h1>Статус: В наличии</h1>
          <p>Цена: {car.price} рублей</p>
        </div>
      </div>
      <button className="delete-car" onClick={() => removeFromCard(car.id)}>
        Удалить
      </button>
    </div>
  );
};

export default CartItem;
