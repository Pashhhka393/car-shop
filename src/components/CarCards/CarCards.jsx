import { Link } from "react-router-dom";
import CarCard from "../CarCard/CarCard";
import "./carcards.scss";
import Spinner from "../UI/Spinner/Spinner";
import { useCart } from "../../context/CartContextReducer";

const CarCards = ({ cars }) => {
  const { isLoading } = useCart();

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
