import {
  createContext,
  useState,
  useReducer,
  useContext,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { addCar, removeAll, removeCar, API_URL } from "../api/cars";
import { Car } from "../types/car";

type CartAction =
  | { type: "ADD_TO_CART"; payload: Car }
  | { type: "REMOVE_FROM_CART"; payload: string | number }
  | { type: "CLEAR_CART" };

interface CartState {
  cartItems: Car[];
}

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  addCarToCart: (car: Car) => Promise<void>;
  removeFromCard: (id: string | number) => Promise<void>;
  handleClearCart: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContextReducer = createContext<CartContextType | null>(null);

const initialState: CartState = {
  cartItems: (() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  })(),
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cartItems: [...state.cartItems, action.payload] };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((c) => c.id !== action.payload),
      };

    case "CLEAR_CART":
      return { ...state, cartItems: [] };

    default:
      return state;
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data: Car[] = await response.json();
        setCars(data);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const addCarToCart = useCallback(async (car: Car) => {
    try {
      const response = await addCar(car);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server error ${response.status}: ${text}`);
      }

      const updateCar: Car = await response.json();
      setCars((prev) =>
        prev.map((item) => (car.id === item.id ? updateCar : item)),
      );
      dispatch({ type: "ADD_TO_CART", payload: updateCar });
    } catch (error) {
      console.log("Ошибка при добавлении в корзину", error);
    }
  }, []);

  const removeFromCard = useCallback(async (id: string | number) => {
    try {
      const response = await removeCar(id);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const updCar: Car = await response.json();

      setCars((prev) => prev.map((item) => (id === item.id ? updCar : item)));
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const removeAllCard = useCallback(async () => {
    try {
      const responses = await Promise.all(
        state.cartItems.map((car) => removeAll(car)),
      );
      const updatedCars: Car[] = await Promise.all(
        responses.map((res) => res.json()),
      );

      setCars((prev) =>
        prev.map((item) => {
          const updated = updatedCars.find((c) => c.id === item.id);
          return updated || item;
        }),
      );
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.log("Ошибка при очистке корзины", error);
    }
  }, [state.cartItems]);

  const handleClearCart = useCallback(async () => {
    const userAnswer = confirm("Вы уверены, что хотите очистить корзину?");
    if (userAnswer) {
      await removeAllCard();
    }
  }, [removeAllCard]);

  return (
    <CartContextReducer.Provider
      value={{
        state,
        dispatch,
        cars,
        setCars,
        addCarToCart,
        removeFromCard,
        handleClearCart,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </CartContextReducer.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContextReducer);
  if (!context) {
    throw new Error("useCart должен использоваться внутри CartProvider");
  }
  return context;
};
