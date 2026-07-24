import "./carcard.scss";

const CarCard = ({
  img,
  name,
  year,
  newCar,
  bgName,
  engine,
  drive,
  bodytype,
  price,
}) => {
  return (
    <div className="card-car">
      <div className="title">
        <div className="title-name">
          <p className="name-car">{name}</p>
          <p className="year-car">{year}</p>
        </div>
        {newCar ? (
          <div className="new-car">
            <div className="elipse-car "></div>
            <p className="name">НОВОЕ</p>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="car-image">
        <p className="name">{bgName}</p>
        <div className="img-wrapper">
          <img src={img} alt="car-image" />
        </div>
      </div>

      <div className="settings-car">
        <div className="engine">
          <img src="./engine.svg" alt="" />
          <p>{engine} л.</p>
        </div>

        <div className="drive">
          <img src="./drive.svg" alt="" />
          <p>{drive}</p>
        </div>

        <div className="bodytype">
          <img src="./bodytype.svg" alt="" />
          <p>{bodytype}</p>
        </div>
      </div>

      <div className="price">
        <p>{price} ₽</p>
      </div>
    </div>
  );
};

export default CarCard;
