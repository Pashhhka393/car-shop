import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CartProvider>,
);
