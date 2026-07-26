import "./setcarpage.scss";

const SetCarPage = ({ img, firstTitle, secondTitle }) => {
  return (
    <div className="settings_car-item">
      <div className="img-wrapper">
        <img src={img} alt="" />
        <div className="settings_car-desc">
          <p>{firstTitle}</p>
          <p>{secondTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default SetCarPage;
