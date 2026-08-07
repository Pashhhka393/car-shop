import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CharacterCar from "./CharacterCar/CharacterCar";
import SetCarPage from "./SetCatPage/SetCarPage";
import "./carpage.scss";
import { useCart } from "../../context/CartContextReducer";
import { Car } from "../../types/car";

interface CarPageProps {
  addCarToFavourite: (car: Car) => void;
}

const CarPage = ({ addCarToFavourite }: CarPageProps) => {
  const { cars, addCarToCart } = useCart();
  const { id } = useParams<{ id: string }>();
  const car = cars.find((c) => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!car) {
    return <div>Машина не найдена!</div>;
  }

  return (
    <div className="container">
      <div className="info-page">
        <div className="header-info">
          <h1>{car.name}</h1>
          <Link to="/">
            <button>Вернуться на главную ⬅️</button>
          </Link>
        </div>
        <div className="info-items">
          <div className="character-car">
            <div className="preview-car">
              <div className="img-wrapper">
                <img src={car.otherImages} alt="car-image" />
              </div>
              <div className="preview_car-desc">
                <h1>Описание</h1>
                <p className="desc-car">{car.options.join(", ")}</p>

                <div className="settings-car">
                  <div className="settings_car-container">
                    <SetCarPage
                      img="/horsepower.svg"
                      firstTitle="Лошадиные силы"
                      secondTitle={car.horsepower}
                    />
                    <SetCarPage
                      img="/drive.svg"
                      firstTitle="Привод"
                      secondTitle={car.otherDrive}
                    />
                    <SetCarPage
                      img="/seets.svg"
                      firstTitle="Количество посадочных мест"
                      secondTitle={car.seets}
                    />
                    <SetCarPage
                      img="/speedometer.svg"
                      firstTitle="Разгон до 100км/ч"
                      secondTitle={car.speed}
                    />
                    <SetCarPage
                      img="/distance.svg"
                      firstTitle="Средняя дальность действия на один заряд"
                      secondTitle={car.distance}
                    />
                    <SetCarPage
                      img="/transmition.svg"
                      firstTitle="Коробка передач"
                      secondTitle={car.transmition}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="specifications">
            <div className="specifications-container">
              <div className="specifications-title">
                <h1>{car.name}</h1>
              </div>
              <div className="specifications-items">
                <CharacterCar title="Привод" valueTitle={car.otherDrive} />
                <CharacterCar
                  title="Расход топлива на 100 км"
                  valueTitle={car.fuelConsumption}
                />
                <CharacterCar title="Тип двигателя" valueTitle="Бензиновый" />
                <CharacterCar
                  title="Рабочий объем двигателя"
                  valueTitle={car.engineDisplacement}
                />
                <CharacterCar
                  title="Вместимость багажника макс."
                  valueTitle={car.trunkCapacity}
                />
                <CharacterCar
                  title="Коробка передач"
                  valueTitle={car.typeOfGearbox}
                />
                <CharacterCar
                  title="Тип кузова"
                  valueTitle={car.otherBodyType}
                />
              </div>

              <div className="specifications-btn">
                {car.inCart ? (
                  <button className="in-cart-btn">В КОРЗИНЕ</button>
                ) : (
                  <button onClick={() => addCarToCart(car)}>В КОРЗИНУ</button>
                )}
                {car.isFavourite ? (
                  <button className="in-favourite">В ИЗБРАННОМ</button>
                ) : (
                  <button onClick={() => addCarToFavourite(car)}>
                    В ИЗБРАННОЕ
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarPage;
