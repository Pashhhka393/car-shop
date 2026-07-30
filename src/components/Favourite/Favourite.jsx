import { Link } from "react-router-dom";
import "./favourite.scss";
import FavouriteItem from "./FavouriteItem/FavouriteItem";

const Favourite = ({ filteredIsFavouriteCars, removeFromFavourite }) => {
  return (
    <>
      {filteredIsFavouriteCars.length === 0 ? (
        <div className="empty-cart">
          <h1>Список избранных авто пуст</h1>
          <p>Добавьте хотя бы одно авто в избранное, чтобы продолжить</p>
          <Link to="/">
            <button>На главную</button>
          </Link>
        </div>
      ) : (
        <div className="favourite-cars">
          <div className="container">
            <div className="favourite-header">
              <h1>❤️ Избранные автомобили {filteredIsFavouriteCars.length}</h1>
              <Link to="/">
                <button>На главную</button>
              </Link>
            </div>

            <div className="favourite-items">
              {filteredIsFavouriteCars.map((car) => (
                <FavouriteItem
                  key={car.id}
                  car={car}
                  removeFromFavourite={removeFromFavourite}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Favourite;
