import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CarCard from "../CarCard/CarCard";
import "./carcards.scss";
import Spinner from "../UI/Spinner/Spinner";

const CarCards = ({ isLoading }) => {
  const { cars } = useCart();
  return (
    <div className="car-sale">
      <h1>ГОРЯЧИЕ ПРЕДЛОЖЕНИЯ</h1>
      <div className="cards-cars">
        {isLoading && <Spinner />}
        {cars.slice(0, 8).map((car) => {
          return (
            <Link
              key={car.id}
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/car/${car.id}`}
            >
              <CarCard car={car} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CarCards;
