import { useEffect, useState } from "react";
import CarCards from "./components/CarCards/CarCards";
import Header from "./components/Header/Header";
import PreviewCards from "./components/PreviewCards/PreviewCards";

const App = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/cars");
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-wrapper">
        <Header />
        <div className="preview-words">
          <span>НАЙДИ СВОЙ СЛЕДУЮЩИЙ АВТОМОБИЛЬ</span>
          <span>ПРЕМИАЛЬНЫЕ АВТО ИЗ ДУБАЯ</span>
        </div>
      </div>

      <div className="container">
        <PreviewCards />
        <CarCards cars={cars} />
      </div>
      {/* <div className="container">
        <div className="info-page">
          <div className="header-info">
            <h1>Lexus LX LX500d</h1>
            <button>Вернуться на главную ⬅️</button>
          </div>
          <div className="info-items">
            <div className="character-car">
              <div className="preview-car">
                <div className="img-wrapper">
                  <img src="./info-img-lexus-1.png" alt="car-image" />
                </div>
                <div className="preview_car-desc">
                  <h1>Описание</h1>
                  <p>
                    Легкосплавные диски, тонировка, люк, спойлер, рейлинги,
                    ксенон, биксенон, хрустальная оптика, линзованная оптика,
                    дневные ходовые огни, противотуманные фары, омыватель фар,
                    корректор фар, кожаный салон, комбинированный салон, шторки,
                    аудиосистема, встроенный телефон, Bluetooth, CD,
                    CD-чейнджер, MP3, USB, DVD, DVD-чейнджер, сабвуфер,
                    гидроусилитель руля, ABS, подушки безопасности, зимний
                    режим, спортивный режим, бесключевой доступ, полный
                    электропакет, центральный замок, кондиционер,
                    климат-контроль, круиз-контроль, бортовой компьютер,
                    навигационная система, мультимедиа, подогрев сидений,
                    подогрев задних сидений, вентиляция сидений, память сидений,
                    память руля, парктроник, камера заднего вида, датчик света,
                    датчик дождя, датчик давления в шинах, пневмоподвеска,
                    регулируемый дорожный просвет, свежий пригон, свежая
                    доставка.
                  </p>

                  <div className="settings-car">
                    <div className="settings_car-container">
                      <div className="settings_car-item">
                        <div className="img-wrapper">
                          <img src="./horsepower.svg" alt="horse-image" />
                          <div className="settings_car-desc">
                            <p>Лошадиные силы</p>
                            <p>367 л.с.</p>
                          </div>
                        </div>
                      </div>

                      <div className="settings_car-item">
                        <div className="img-wrapper">
                          <img src="./wheel-drive.svg" alt="horse-image" />
                          <div className="settings_car-desc">
                            <p>Привод</p>
                            <p>Передний</p>
                          </div>
                        </div>
                      </div>

                      <div className="settings_car-item">
                        <div className="img-wrapper">
                          <img src="./seets.svg" alt="horse-image" />
                          <div className="settings_car-desc">
                            <p>Количество посадочных мест</p>
                            <p>5</p>
                          </div>
                        </div>
                      </div>

                      <div className="settings_car-item">
                        <div className="img-wrapper">
                          <img src="./speedometer.svg" alt="horse-image" />
                          <div className="settings_car-desc">
                            <p>Скорость до 100 км/ч</p>
                            <p>7.7 сек.</p>
                          </div>
                        </div>
                      </div>

                      <div className="settings_car-item">
                        <div className="img-wrapper">
                          <img src="./distance.svg" alt="horse-image" />
                          <div className="settings_car-desc">
                            <p>Средняя дальность действия на один заряд</p>
                            <p>587 км</p>
                          </div>
                        </div>
                      </div>

                      <div className="settings_car-item">
                        <div className="img-wrapper">
                          <img src="./transmition.svg" alt="horse-image" />
                          <div className="settings_car-desc">
                            <p>Коробка передач</p>
                            <p>Автомат</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="specifications">
              <div className="specifications-container">
                <div className="specifications-title">
                  <h1>Lexus LX LX500d</h1>
                </div>
                <div className="specifications-items">
                  <div className="specifications-item">
                    <p className="type">Привод</p>
                    <p className="value">Полный</p>
                  </div>

                  <div className="specifications-item">
                    <p className="type">Рабочий объем двигателя</p>
                    <p className="value">5,698 см3</p>
                  </div>

                  <div className="specifications-item">
                    <p className="type">Тип двигателя </p>
                    <p className="value">Бензиновый</p>
                  </div>

                  <div className="specifications-item">
                    <p className="type">Расход топлива на 100 км</p>
                    <p className="value">14.4 л.</p>
                  </div>

                  <div className="specifications-item">
                    <p className="type">Тип кузова</p>
                    <p className="value">Внедорожник</p>
                  </div>

                  <div className="specifications-item">
                    <p className="type">Вместимость багажника макс.</p>
                    <p className="value">701 л.</p>
                  </div>
                </div>
                <div className="specifications-btn">
                  <button>В КОРЗИНУ</button>
                  <button>В ИЗБРАННОЕ</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default App;
