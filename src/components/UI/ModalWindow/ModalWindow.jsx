import "./modalwindow.scss";

const ModalWindow = ({ car }) => {
  return (
    <div className="modal-window">
      <p>
        Автомобиль <span>{car.name}</span> добавлен в корзину
      </p>
      <div className="modal-window-overlay"></div>
    </div>
  );
};

export default ModalWindow;
