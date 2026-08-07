import "./emptycart.scss";

import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <>
      <div className="empty-cart">
        <h1>Корзина пустая</h1>
        <p>Добавьте хотя бы одно авто в корзину, чтобы продолжить</p>
        <Link to="/">
          <button>На главную</button>
        </Link>
      </div>
    </>
  );
};

export default EmptyCart;
