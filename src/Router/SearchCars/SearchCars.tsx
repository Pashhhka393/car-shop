import { Link } from "react-router-dom";
import "./searchcar.scss";
import CarCard from "../../components/CarCard/CarCard";
import { useRef } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import { useCart } from "../../context/CartContextReducer";

interface SearchCarsProps {
  searchCar: string;
  setSearchCar: (search: string) => void;
}

const SearchCars = ({ searchCar, setSearchCar }: SearchCarsProps) => {
  const { cars, isLoading } = useCart();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section className="search">
      <div className="container">
        <Link to="/">
          <button className="search__back"> ← На главную</button>
        </Link>
        <h1 className="search__title">Поиск автомобилей</h1>
        <p className="search__subtitle">Найдите автомобиль по названию</p>

        <form className="search__form" onSubmit={(e) => e.preventDefault()}>
          <input
            value={searchCar}
            type="text"
            onChange={(e) => setSearchCar(e.target.value)}
            className="search__input"
            placeholder="Например: BMW M4, Audi RS6..."
          />
        </form>
        {isLoading && <Spinner />}
        <div ref={scrollRef} onWheel={handleWheel} className="search__results">
          {cars
            .filter((car) =>
              car.name.toLowerCase().includes(searchCar.toLowerCase().trim()),
            )
            .map((car) => (
              <Link key={car.id} to={`/car/${car.id}`}>
                <CarCard car={car} />
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SearchCars;
