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
  chooseFilterBrand,
  resetFilterBrand,
}) => {
  return (
    <>
      <div className="bg-wrapper">
        <Header
          cartItems={cartItems}
          filteredIsFavouriteCars={filteredIsFavouriteCars}
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
            <button onClick={resetFilterBrand}>Сбросить фильтр</button>
          </div>
          <div className="sort-items">
            {sortItem.map(({ id, img, title }) => (
              <SortItem
                key={id}
                img={img}
                title={title}
                chooseFilterBrand={chooseFilterBrand}
              />
            ))}
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
