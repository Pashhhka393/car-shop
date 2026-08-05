import { createContext, useState, useContext, useCallback } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");

    try {
      return savedCartItems ? JSON.parse(savedCartItems) : [];
    } catch (e) {
      console.log("Ошибка localStorage: ", e);
      return [];
    }
  });
  const [cars, setCars] = useState([]);
  const [modalWindowCartOpen, setModalWindowCartOpen] = useState(false);

  const addCarToCart = async (car) => {
    try {
      const response = await fetch(
        `https://cars-api-a83h.onrender.com/cars/${car.id}`,
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
      const response = await fetch(
        `https://cars-api-a83h.onrender.com/cars/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inCart: false }),
        },
      );
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

  const removeAllCard = useCallback(async () => {
    try {
      const responses = await Promise.all(
        cartItems.map((car) => {
          return fetch(`https://cars-api-a83h.onrender.com/cars/${car.id}`, {
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
  }, [cartItems]);

  const handleClearCart = async () => {
    const userAnswer = confirm("Вы уверены, что хотите очистить корзину?");
    if (userAnswer) {
      await removeAllCard();
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,

        cars,
        setCars,

        modalWindowCartOpen,
        setModalWindowCartOpen,

        addCarToCart,
        removeFromCard,
        removeAllCard,
        handleClearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
