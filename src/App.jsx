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

  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cars-api-production-f1ea.up.railway.app/cars",
        );
        const data = await response.json();
        setCars(data);
        setIsLoading(false);
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
      const response = await fetch(
        `https://cars-api-production-f1ea.up.railway.app/${car.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inCart: true }),
        },
      );
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
      const response = await fetch(`https://cars-api-production-f1ea.up.railway.app/${id}`, {
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
          return fetch(`https://cars-api-production-f1ea.up.railway.app/${car.id}`, {
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
    const response = await fetch(
      `https://cars-api-production-f1ea.up.railway.app/${car.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFavourite: true }),
      },
    );

    const updCar = await response.json();
    setCars((prev) => prev.map((item) => (car.id === item.id ? updCar : item)));
    setFilteredIsFavouriteCars((prev) => [...prev, updCar]);
  };
  const removeFromFavourite = async (id) => {
    const response = await fetch(`https://cars-api-production-f1ea.up.railway.app/${id}`, {
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

  const filteredCars = cars.filter((c) => {
    return (
      !selectedBrand ||
      c.name.toLowerCase().includes(selectedBrand.toLowerCase())
    );
  });

  const sortedCars = [...filteredCars];
  switch (sortBy) {
    case "price-asc":
      sortedCars.sort(
        (a, b) => +a.price.replace(/\D/g, "") - +b.price.replace(/\D/g, ""),
      );
      break;
    case "price-desc":
      sortedCars.sort(
        (a, b) => +b.price.replace(/\D/g, "") - +a.price.replace(/\D/g, ""),
      );
      break;
    case "year-asc":
      sortedCars.sort((a, b) => a.year - b.year);
      break;
    case "year-desc":
      sortedCars.sort((a, b) => b.year - a.year);
      break;
    default:
      sortedCars;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            cars={cars}
            cartItems={cartItems}
            filteredIsFavouriteCars={filteredIsFavouriteCars}
            openCart={openCart}
            setOpenCart={setOpenCart}
            isLoading={isLoading}
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
            isLoading={isLoading}
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
            cars={sortedCars}
            cartItems={cartItems}
            filteredIsFavouriteCars={filteredIsFavouriteCars}
            setSelectedBrand={setSelectedBrand}
            sortBy={sortBy}
            setSortBy={setSortBy}
            openCart={openCart}
            setOpenCart={setOpenCart}
            isLoading={isLoading}
          />
        }
      ></Route>
    </Routes>
  );
};

export default App;
