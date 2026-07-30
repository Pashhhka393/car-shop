import Header from "../../components/Header/Header";
import PreviewCards from "../../components/PreviewCards/PreviewCards";
import CarCards from "../../components/CarCards/CarCards";

const Home = ({ cars, cartItems, filteredIsFavouriteCars }) => {
  return (
    <>
      <div className="bg-wrapper">
        <Header
          cartItems={cartItems}
          filteredIsFavouriteCars={filteredIsFavouriteCars}
        />
        <div className="preview-words">
          <span>НАЙДИ СВОЙ СЛЕДУЮЩИЙ АВТОМОБИЛЬ</span>
          <span>ПРЕМИАЛЬНЫЕ АВТО ИЗ ДУБАЯ</span>
        </div>
      </div>

      <div className="container">
        <PreviewCards />
        <CarCards cars={cars} />
      </div>
    </>
  );
};

export default Home;
