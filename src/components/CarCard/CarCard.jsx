import "./carcard.scss";

const CarCard = ({ car }) => {
  return (
    <div className="card-car search-color">
      <div className="title">
        <div className="title-name">
          <p className="name-car">{car.name}</p>
          <p className="year-car">{car.year}</p>
        </div>
        {car.newCar ? (
          <div className="new-car">
            <div className="elipse-car "></div>
            <p className="name">НОВОЕ</p>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="car-image">
        <p className="name">{car.bgName}</p>
        <div className="img-wrapper">
          <img src={car.mainImg} alt="car-image" />
        </div>
      </div>

      <div className="settings-car">
        <div className="engine">
          <img src="./engine.svg" alt="" />
          <p>{car.engine} л.</p>
        </div>

        <div className="drive">
          <img src="./drive.svg" alt="" />
          <p>{car.mainDrive}</p>
        </div>

        <div className="bodytype">
          <img src="./bodytype.svg" alt="" />
          <p>{car.mainBodytype}</p>
        </div>
      </div>

      <div className="price">
        <p>{car.price} ₽</p>
      </div>
    </div>
  );
};

export default CarCard;
