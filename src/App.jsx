import { useMemo, useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Router/Home/Home";
import CarPage from "./components/CarPage/CarPage";
import SearchCars from "./Router/SearchCars/SearchCars";
import Cart from "./components/Cart/Cart";
import Favourite from "./components/Favourite/Favourite";
import Sort from "./components/Sort/Sort";
import { useCart } from "./context/CartContextReducer";
import { API_URL } from "./api/cars";

const App = () => {
  const { cars, setCars } = useCart();

  const [filteredIsFavouriteCars, setFilteredIsFavouriteCars] = useState(() => {
    const saveFavourite = localStorage.getItem("favouriteCars");
    try {
      return saveFavourite ? JSON.parse(saveFavourite) : [];
    } catch (e) {
      console.log(e);
      return [];
    }
  });

  const [searchCar, setSearchCar] = useState("");

  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState(null);

  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "favouriteCars",
      JSON.stringify(filteredIsFavouriteCars),
    );
  });

  const addCarToFavourite = useCallback(async (car) => {
    const response = await fetch(`${API_URL}/${car.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavourite: true }),
    });

    const updCar = await response.json();
    setCars((prev) => prev.map((item) => (car.id === item.id ? updCar : item)));
    setFilteredIsFavouriteCars((prev) => [...prev, updCar]);
  }, []);
  const removeFromFavourite = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavourite: false }),
    });

    const updCar = await response.json();
    setCars((prev) => prev.map((item) => (id === item.id ? updCar : item)));
    setFilteredIsFavouriteCars((prev) => prev.filter((i) => i.id !== id));
  };

  const filteredCars = useMemo(() => {
    return cars.filter((c) => {
      return (
        !selectedBrand ||
        c.name.toLowerCase().includes(selectedBrand.toLowerCase())
      );
    });
  }, [cars, selectedBrand]);

  const sortedCars = useMemo(() => {
    const copy = [...filteredCars];
    switch (sortBy) {
      case "price-asc":
        copy.sort(
          (a, b) => +a.price.replace(/\D/g, "") - +b.price.replace(/\D/g, ""),
        );
        break;
      case "price-desc":
        copy.sort(
          (a, b) => +b.price.replace(/\D/g, "") - +a.price.replace(/\D/g, ""),
        );
        break;
      case "year-asc":
        copy.sort((a, b) => a.year - b.year);
        break;
      case "year-desc":
        copy.sort((a, b) => b.year - a.year);
        break;
    }
    return copy;
  }, [filteredCars, sortBy]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            cars={cars}
            filteredIsFavouriteCars={filteredIsFavouriteCars}
            openCart={openCart}
            setOpenCart={setOpenCart}
          />
        }
      ></Route>
      <Route
        path="/car/:id"
        element={<CarPage addCarToFavourite={addCarToFavourite} />}
      ></Route>
      <Route
        path="/search"
        element={
          <SearchCars searchCar={searchCar} setSearchCar={setSearchCar} />
        }
      ></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route
        path="/favourite"
        element={
          <Favourite
            filteredIsFavouriteCars={filteredIsFavouriteCars}
            removeFromFavourite={removeFromFavourite}
          />
        }
      />
      <Route
        path="/cars"
        element={
          <Sort
            cars={sortedCars}
            filteredIsFavouriteCars={filteredIsFavouriteCars}
            setSelectedBrand={setSelectedBrand}
            sortBy={sortBy}
            setSortBy={setSortBy}
            openCart={openCart}
            setOpenCart={setOpenCart}
          />
        }
      ></Route>
    </Routes>
  );
};

export default App;
