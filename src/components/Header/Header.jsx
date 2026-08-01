import { Link } from "react-router-dom";
import "./header.scss";

const Header = ({ cartItems, filteredIsFavouriteCars }) => {
  return (
    <>
      <div className="register">
        <div className="register-items">
          <p>Вход/Регистрация</p>
        </div>
      </div>
      <header className="header">
        <div className="container">
          <div className="header-items">
            <Link to="/">
              <img
                style={{ cursor: "pointer" }}
                src="./logo.svg"
                alt="logo-image"
                className="logo"
              />
            </Link>
            <div className="header-list">
              <ul>
                <Link to="/cars">
                  <li>АВТОМОБИЛИ</li>
                </Link>
                <li>ЗАПЧАСТИ</li>
                <li>ОБСЛУЖИВАНИЕ</li>
              </ul>
            </div>

            <div className="user_header-items">
              <Link to="/search">
                <img
                  style={{ cursor: "pointer" }}
                  src="./search.svg"
                  alt="search-image"
                />
              </Link>

              <Link style={{ position: "relative" }} to="/favourite">
                <img
                  style={{ cursor: "pointer" }}
                  src="./empty-heart.svg"
                  alt="favourite-image"
                />
                <div style={{}} className="count">
                  {filteredIsFavouriteCars.length}
                </div>
              </Link>
              <Link style={{ position: "relative" }} to="/cart">
                <img
                  style={{ cursor: "pointer" }}
                  src="./empty-cart.svg"
                  alt="cart-image"
                />
                <div style={{}} className="count">
                  {cartItems.length}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
