import "./charactercar.scss";

const CharacterCar = ({ title, valueTitle }) => {
  return (
    <div className="specifications-item">
      <p className="type">{title}</p>
      <p className="value">{valueTitle}</p>
    </div>
  );
};

export default CharacterCar;
