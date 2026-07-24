import "./header.scss";

const Header = () => {
  return (
    <>
      <div className="register">
        <div className="register-items">
          <img
            style={{ cursor: "pointer" }}
            src="./user.svg"
            alt="user-image"
          />
          <p>Вход/Регистрация</p>
        </div>
      </div>
      <header className="header">
        <div className="container">
          <div className="header-items">
            <img
              style={{ cursor: "pointer" }}
              src="./logo.svg"
              alt="logo-image"
              className="logo"
            />
            <div className="header-list">
              <ul>
                <li>АВТОМОБИЛИ</li>
                <li>ЗАПЧАСТИ</li>
                <li>ОБСЛУЖИВАНИЕ</li>
              </ul>
            </div>

            <div className="user_header-items">
              <img
                style={{ cursor: "pointer" }}
                src="./search.svg"
                alt="search-image"
              />

              <img
                style={{ cursor: "pointer" }}
                src="./empty-heart.svg"
                alt="favourite-image"
              />
              <img
                style={{ cursor: "pointer" }}
                src="./empty-cart.svg"
                alt="cart-image"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
