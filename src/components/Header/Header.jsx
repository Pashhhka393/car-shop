import { Link } from "react-router-dom";
import "./header.scss";

const Header = ({
  cartItems,
  filteredIsFavouriteCars,
  openCart,
  setOpenCart,
}) => {
  const handleMenuToggle = () => {
    setOpenCart(!openCart);
  };

  const handleCloseMenu = () => {
    setOpenCart(false);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-items">
            <Link className="wrapper-logo" to="/">
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

            <div className="wrapper-items">
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
              <div
                style={{ cursor: "pointer" }}
                className="header-menu"
                onClick={handleMenuToggle}
              >
                <img src="/menu.svg" alt="menu-image" />
              </div>
            </div>
          </div>

          {openCart ? (
            <>
              <div className="overlay" onClick={handleCloseMenu}></div>
              <div className="menu">
                <h2>Меню</h2>
                <ul className="menu-list">
                  <Link to="/">
                    <li onClick={handleCloseMenu}>Главная</li>
                  </Link>
                  <Link to="/cars">
                    {" "}
                    <li onClick={handleCloseMenu}>Автомобили</li>
                  </Link>
                  <li onClick={handleCloseMenu}>Запчасти</li>
                  <li onClick={handleCloseMenu}>Обслуживание</li>
                </ul>

                <div className="user_header-items menu-user">
                  <Link
                    className="menu-link"
                    to="/search"
                    onClick={handleCloseMenu}
                  >
                    <div className="menu-item">
                      <div className="menu-item-left">
                        <img
                          style={{ cursor: "pointer" }}
                          src="./search.svg"
                          alt="search-image"
                        />
                        <span>Поиск</span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    className="menu-link"
                    to="/favourite"
                    onClick={handleCloseMenu}
                  >
                    <div className="menu-item">
                      <div className="menu-item-left">
                        <img
                          style={{ cursor: "pointer" }}
                          src="./empty-heart.svg"
                          alt="favourite-image"
                        />
                        <span>Избранное</span>
                      </div>
                      <div className="count">
                        {filteredIsFavouriteCars.length}
                      </div>
                    </div>
                  </Link>

                  <Link
                    className="menu-link"
                    to="/cart"
                    onClick={handleCloseMenu}
                  >
                    <div className="menu-item">
                      <div className="menu-item-left">
                        <img
                          style={{ cursor: "pointer" }}
                          src="./empty-cart.svg"
                          alt="cart-image"
                        />
                        <span>Корзина</span>
                      </div>
                      <div className="count">{cartItems.length}</div>
                    </div>
                  </Link>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </header>
    </>
  );
};

export default Header;
