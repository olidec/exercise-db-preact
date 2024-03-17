import { h, render } from "preact";
import { App } from "./app.jsx";
import "./index.css";
import { createContext } from "preact";

import { WarenkorbProvider } from "./signals/warenkorb";

render(
  <WarenkorbProvider>
    <App />
  </WarenkorbProvider>,

  document.getElementById("app")
);
