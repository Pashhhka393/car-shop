import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Router/Home/Home";
import CarPage from "./components/CarPage/CarPage";
import SearchCars from "./Router/SearchCars/SearchCars";
import Cart from "./components/Cart/Cart";
import Favourite from "./components/Favourite/Favourite";
import Sort from "./components/Sort/Sort";

const App = () => {
  const [cars, setCars] = useState([]);
  const [displayedCars, setDisplayedCars] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");

    try {
      return savedCartItems ? JSON.parse(savedCartItems) : [];
    } catch (e) {
      console.log("Ошибка localStorage: ", e);
      return [];
    }
  });
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
  const [modalWindowCartOpen, setModalWindowCartOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/cars");
        const data = await response.json();
        setCars(data);
        setDisplayedCars(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  });
  useEffect(() => {
    localStorage.setItem(
      "favouriteCars",
      JSON.stringify(filteredIsFavouriteCars),
    );
  });

  const addCarToCart = async (car) => {
    try {
      const response = await fetch(`http://localhost:3001/cars/${car.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inCart: true }),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server error ${response.status}: ${text}`);
      }

      const updateCar = await response.json();
      setCars((prev) =>
        prev.map((item) => (car.id === item.id ? updateCar : item)),
      );
      setCartItems((prev) => [...prev, updateCar]);
      setModalWindowCartOpen(true);
      setTimeout(() => setModalWindowCartOpen(false), 2500);
    } catch (error) {
      console.log("Ошибка при добавлении в корзину", error);
    }
  };
  const removeFromCard = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/cars/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inCart: false }),
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const updCar = await response.json();

      setCars((prev) => prev.map((item) => (id === item.id ? updCar : item)));
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log("error", error);
    }
  };
  const removeAllCard = async () => {
    try {
      const responses = await Promise.all(
        cartItems.map((car) => {
          return fetch(`http://localhost:3001/cars/${car.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inCart: false }),
          });
        }),
      );

      const updatedCars = await Promise.all(responses.map((res) => res.json()));

      setCars((prev) =>
        prev.map((item) => {
          const updated = updatedCars.find((c) => c.id === item.id);
          return updated || item;
        }),
      );
      setCartItems([]);
    } catch (error) {
      console.log("Ошибка при очистке корзины", error);
    }
  };
  const handleClearCart = async () => {
    const userAnswer = confirm("Вы уверены, что хотите очистить корзину?");
    if (userAnswer) {
      await removeAllCard();
    }
  };
  const addCarToFavourite = async (car) => {
    const response = await fetch(`http://localhost:3001/cars/${car.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavourite: true }),
    });

    const updCar = await response.json();
    setCars((prev) => prev.map((item) => (car.id === item.id ? updCar : item)));
    setFilteredIsFavouriteCars((prev) => [...prev, updCar]);
  };
  const removeFromFavourite = async (id) => {
    const response = await fetch(`http://localhost:3001/cars/${id}`, {
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
  const chooseFilterBrand = (brandName) => {
    setDisplayedCars(
      cars.filter(({ name }) => {
        const lowerName = name.toLowerCase();
        const lowerBrand = brandName.toLowerCase();

        return (
          lowerName.includes(`${lowerBrand}`) ||
          lowerName.startsWith(lowerBrand)
        );
      }),
    );
  };
  const resetFilterBrand = () => setDisplayedCars(cars);
  const sortByPrice = (text) => {
    const newCarsPriceLow = [...cars];
    text === "asc"
      ? newCarsPriceLow.sort(
          (a, b) => +a.price.replaceAll(" ", "") - +b.price.replaceAll(" ", ""),
        )
      : newCarsPriceLow.sort(
          (a, b) => +b.price.replaceAll(" ", "") - +a.price.replaceAll(" ", ""),
        );
    setDisplayedCars(newCarsPriceLow);
  };
  const sortByYear = (text) => {
    const newCarsPriceLow = [...cars];
    text === "asc"
      ? newCarsPriceLow.sort((a, b) => a.year - b.year)
      : newCarsPriceLow.sort((a, b) => b.year - a.year);
    setDisplayedCars(newCarsPriceLow);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            cars={cars}
            cartItems={cartItems}
            filteredIsFavouriteCars={filteredIsFavouriteCars}
          />
        }
      ></Route>
      <Route
        path="/car/:id"
        element={
          <CarPage
            cars={cars}
            addCarToCart={addCarToCart}
            modalWindowCartOpen={modalWindowCartOpen}
            addCarToFavourite={addCarToFavourite}
          />
        }
      ></Route>
      <Route
        path="/search"
        element={
          <SearchCars
            cars={cars}
            searchCar={searchCar}
            setSearchCar={setSearchCar}
          />
        }
      ></Route>
      <Route
        path="/cart"
        element={
          <Cart
            cartItems={cartItems}
            handleClearCart={handleClearCart}
            removeFromCard={removeFromCard}
          />
        }
      ></Route>
      <Route
        path="/favourite"
        element={
          <Favourite
            cars={cars}
            filteredIsFavouriteCars={filteredIsFavouriteCars}
            removeFromFavourite={removeFromFavourite}
          />
        }
      />
      <Route
        path="/cars"
        element={
          <Sort
            cars={displayedCars}
            cartItems={cartItems}
            filteredIsFavouriteCars={filteredIsFavouriteCars}
            chooseFilterBrand={chooseFilterBrand}
            resetFilterBrand={resetFilterBrand}
            sortByPrice={sortByPrice}
            sortByYear={sortByYear}
          />
        }
      ></Route>
    </Routes>
  );
};

export default App;
