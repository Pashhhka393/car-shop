import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.js";
import { CartProvider } from "./context/CartContextReducer.js";

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CartProvider>,
);
