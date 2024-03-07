import { h, render } from "preact";
import { App } from "./app.jsx";
import "./index.css";
import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { cartItems } from "./signals/warenkorb";
import { getCart, getCartCount } from "./signals/warenkorb";
const AppState = createContext();

render(
  <AppState.Provider value={getCartCount()}>
    <App />
  </AppState.Provider>,
  document.getElementById("app")
);
