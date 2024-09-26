import { render } from "preact";
import { App } from "./app.jsx";
import "./index.css";

import { LaTeXJSComponent } from "https://cdn.jsdelivr.net/npm/latex.js/dist/latex.mjs";
customElements.define("latex-js", LaTeXJSComponent);

import { WarenkorbProvider } from "./signals/warenkorb";
import { SearchProvider } from "./signals/exercise";
import { AuthProvider } from "./context/AuthContext.jsx";
render(
  <AuthProvider>
    <WarenkorbProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </WarenkorbProvider>
  </AuthProvider>,

  document.getElementById("app")
);
