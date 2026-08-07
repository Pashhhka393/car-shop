import Header from "../../components/Header/Header";
import CarCards from "../../components/CarCards/CarCards";

interface HomeProps {
  cars: any[];
  filteredIsFavouriteCars: any[];
  openCart: boolean;
  setOpenCart: (open: boolean) => void;
}

const Home = ({
  cars,
  filteredIsFavouriteCars,
  openCart,
  setOpenCart,
}: HomeProps) => {
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
