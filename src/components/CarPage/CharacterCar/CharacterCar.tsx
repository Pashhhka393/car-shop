import "./charactercar.scss";

interface CharacterCar {
  title: string;
  valueTitle: string | number;
}

const CharacterCar = ({ title, valueTitle }: CharacterCar) => {
  return (
    <div className="specifications-item">
      <p className="type">{title}</p>
      <p className="value">{valueTitle}</p>
    </div>
  );
};

export default CharacterCar;
