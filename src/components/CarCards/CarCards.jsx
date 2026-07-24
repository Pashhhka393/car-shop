import CarCard from "../CarCard/CarCard";
import "./carcards.scss";

const CarCards = () => {
  return (
    <div className="car-sale">
      <h1>ГОРЯЧИЕ ПРЕДЛОЖЕНИЯ</h1>
      <div className="cards-cars">
        <CarCard
          img="./lexus-1.svg"
          name="Lexus LX LX500d"
          year="2022"
          newCar={true}
          bgName="LEXUS"
          engine="5.7"
          drive="ПОЛН."
          bodytype="ВНЕДОРОЖ."
          price="16 000 000"
        />
        <CarCard
          img="./mercedes1.svg"
          name="Mercedes-AMG GT 63 S "
          year="2014 "
          newCar={false}
          bgName="MERCEDES"
          engine="4.0"
          drive="ЗАД."
          bodytype="КАБРИОЛ."
          price="15 000 000"
        />
        <CarCard
          img="./bmw-1.png"
          name="BMW M5 F90 Comp."
          year="2017"
          newCar={true}
          bgName="BMW"
          engine="4.4"
          drive="ПОЛН."
          bodytype="СЕДАН"
          price="20 000 000"
        />
        <CarCard
          img="camry-1.svg"
          name="Toyota Camry"
          year="2014"
          newCar={false}
          bgName="TOYOTA"
          engine="3.5"
          drive="ПЕРЕД."
          bodytype="СЕДАН"
          price="1 500 000"
        />
      </div>
    </div>
  );
};

export default CarCards;
