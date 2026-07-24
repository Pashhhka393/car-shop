import "./previewcards.scss";

const PreviewCards = () => {
  return (
    <div className="preview-cards">
      <div className="card-1">
        <h1>АВТОМОБИЛИ</h1>
        <button>БОЛЬШЕ</button>
      </div>
      <div className="wrapper-cards">
        <div className="card-2">
          <h1>ЗАПЧАСТИ</h1>
          <button>БОЛЬШЕ</button>
        </div>
        <div className="card-3">
          <h1>ОБСЛУЖИВАНИЕ</h1>
          <button>БОЛЬШЕ</button>
        </div>
      </div>
    </div>
  );
};

export default PreviewCards;
