import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
import "./cart.scss";
import EmptyCart from "./EmptyCart/EmptyCart";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cartItems, handleClearCart } = useCart();

  return (
    <>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="cart">
          <div className="container">
            <div className="header-cart">
              <div className="header-info">
                <h1>Корзина: </h1>
                <p>{cartItems.length} авто</p>
              </div>
              <div className="cart-navigation">
                <button onClick={handleClearCart}>Очистить корзину</button>
                <Link to="/">
                  <button>На главную</button>
                </Link>
              </div>
            </div>

            <div className="cart-items">
              {cartItems.map((car) => {
                return <CartItem key={car.id} car={car} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
