import CarCard from "../CarCard/CarCard";
import "./carcards.scss";

const CarCards = ({ cars }) => {
  return (
    <div className="car-sale">
      <h1>ГОРЯЧИЕ ПРЕДЛОЖЕНИЯ</h1>
      <div className="cards-cars">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarCards;
