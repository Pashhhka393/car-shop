import Header from "../../components/Header/Header";
import CarCards from "../../components/CarCards/CarCards";

const Home = ({
  filteredIsFavouriteCars,
  openCart,
  setOpenCart,
  isLoading,
}) => {
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
        <CarCards isLoading={isLoading} />
      </div>
    </>
  );
};

export default Home;
