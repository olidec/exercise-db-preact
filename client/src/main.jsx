import { h, render } from "preact";
import { App } from "./app.jsx";
import "./index.css";

import { WarenkorbProvider } from "./signals/warenkorb";
import { SearchProvider } from "./signals/exercise";
render(
  <WarenkorbProvider>
    <SearchProvider>
      <App />
    </SearchProvider>
  </WarenkorbProvider>,

  document.getElementById("app")
);
