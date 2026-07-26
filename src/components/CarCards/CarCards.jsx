import { Link } from "react-router-dom";
import CarCard from "../CarCard/CarCard";
import "./carcards.scss";

const CarCards = ({ cars }) => {
  return (
    <div className="car-sale">
      <h1>ГОРЯЧИЕ ПРЕДЛОЖЕНИЯ</h1>
      <div className="cards-cars">
        {cars.map((car) => {
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
