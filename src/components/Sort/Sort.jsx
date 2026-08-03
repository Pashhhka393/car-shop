import { Link } from "react-router-dom";
import Header from "../Header/Header";
import SortItem from "./SortItem/SortItem";
import CarCard from "../CarCard/CarCard";
import "./sort.scss";

const sortItem = [
  {
    id: 1,
    img: "/sort-lambo.svg",
    title: "Lamborghini",
  },
  {
    id: 2,
    img: "/sort-bmw.svg",
    title: "Bmw",
  },
  {
    id: 3,
    img: "/sort-lexus.svg",
    title: "Lexus",
  },
  {
    id: 4,
    img: "/sort-audi.svg",
    title: "Audi",
  },
  {
    id: 5,
    img: "/sort-rolls-royce.svg",
    title: "Rolls-Royce",
  },
  {
    id: 6,
    img: "/sort-porsche.svg",
    title: "Porsche",
  },
  {
    id: 7,
    img: "/sort-toyota.svg",
    title: "Toyota",
  },
  {
    id: 8,
    img: "/sort-mercedes.svg",
    title: "Mercedes",
  },
];

const Sort = ({
  cars,
  cartItems,
  filteredIsFavouriteCars,
  setSelectedBrand,
  sortBy,
  setSortBy,
  openCart,
  setOpenCart,
}) => {
  return (
    <>
      <div className="bg-wrapper">
        <Header
          cartItems={cartItems}
          filteredIsFavouriteCars={filteredIsFavouriteCars}
          openCart={openCart}
          setOpenCart={setOpenCart}
        />
        <div className="preview-words">
          <span>НАЙДИ СВОЙ СЛЕДУЮЩИЙ АВТОМОБИЛЬ</span>
          <span>ПРЕМИАЛЬНЫЕ АВТО ИЗ ДУБАЯ</span>
        </div>
      </div>

      <div className="sort-cars">
        <div className="sort">
          <div className="header-sort">
            <h1 className="sort-title">Марки</h1>
            <button
              onClick={() => {
                setSelectedBrand("");
                setSortBy("");
              }}
            >
              Сбросить фильтр
            </button>
          </div>
          <div className="filter-sort-container">
            <div className="sort-items">
              {sortItem.map(({ id, img, title }) => (
                <SortItem
                  key={id}
                  img={img}
                  title={title}
                  setSelectedBrand={setSelectedBrand}
                />
              ))}
            </div>

            <div className="sort-price">
              <div className="sort__price-item">
                <h1>Сортировать по: </h1>
                <div className="sort__btns">
                  <button
                    className={`${sortBy === "price-asc" ? "active" : ""}`}
                    onClick={() =>
                      setSortBy(sortBy === "price-asc" ? "" : "price-asc")
                    }
                  >
                    Цена ↑{" "}
                  </button>
                  <button
                    className={`${sortBy === "price-desc" ? "active" : ""}`}
                    onClick={() =>
                      setSortBy(sortBy === "price-desc" ? "" : "price-desc")
                    }
                  >
                    Цена ↓
                  </button>
                  <button
                    className={`${sortBy === "year-asc" ? "active" : ""}`}
                    onClick={() =>
                      setSortBy(sortBy === "year-asc" ? "" : "year-asc")
                    }
                  >
                    Год ↑
                  </button>
                  <button
                    className={`${sortBy === "year-desc" ? "active" : ""}`}
                    onClick={() =>
                      setSortBy(sortBy === "year-desc" ? "" : "year-desc")
                    }
                  >
                    Год ↓
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="all-cars">
          <div className="sort-cards-cars">
            {cars.map((c) => (
              <Link to={`/car/${c.id}`} key={c.id}>
                <CarCard car={c} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sort;
