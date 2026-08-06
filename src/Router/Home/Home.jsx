import Header from "../../components/Header/Header";
import CarCards from "../../components/CarCards/CarCards";

const Home = ({ cars, filteredIsFavouriteCars, openCart, setOpenCart }) => {
  return (
    <>
      <div className="bg-wrapper">
        <Header
          filteredIsFavouriteCars={filteredIsFavouriteCars}
          openCart={openCart}
          setOpenCart={setOpenCart}
        />
        <div className="preview-words">
          <span>НАЙДИ СВОЙ СЛЕДУЮЩИЙ АВТОМОБИЛЬ</span>
          <span>ПРЕМИАЛЬНЫЕ АВТО ИЗ ДУБАЯ</span>
        </div>
      </div>

      <div className="container">
        <CarCards cars={cars} />
      </div>
    </>
  );
};

export default Home;
