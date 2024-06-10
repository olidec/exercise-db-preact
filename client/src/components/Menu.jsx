import { Link } from "preact-router/match";
import { useContext, useState } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
import { askServer } from "../utils/connector.js";
import { WarenkorbContext } from "../signals/warenkorb.jsx";
export default function Menu() {
  const { cartSearch } = useContext(SearchContext);
  const [selectedMenu, setSelectedMenu] = useState("");
  const { cartItems, getCart, getCartCount } = useContext(WarenkorbContext);
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div
      className="pure-menu pure-menu-horizontal"
      style={{
        position: "fixed",
        top: "0",
        width: "100%",
        fontSize: "18px",
        fontWeight: "bold",
      }}
    >
      <ul
        className="pure-menu-list"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <li
          className={`pure-menu-item ${
            selectedMenu === "user" ? "pure-menu-selected" : ""
          }`}
        >
          <Link
            href="/exercise-db-preact/user"
            className="pure-menu-link"
            onClick={() => handleMenuClick("user")}
          >
            User
          </Link>
        </li>
        <li
          className={`pure-menu-item ${
            selectedMenu === "add" ? "pure-menu-selected" : ""
          }`}
        >
          <Link
            href="/exercise-db-preact/add"
            className="pure-menu-link"
            onClick={() => handleMenuClick("add")}
          >
            Aufgaben hinzufügen
          </Link>
        </li>
        <li
          className={`pure-menu-item ${
            selectedMenu === "find" ? "pure-menu-selected" : ""
          }`}
        >
          <Link
            href="/exercise-db-preact/find"
            className="pure-menu-link"
            onClick={() => handleMenuClick("find")}
          >
            Aufgaben finden
          </Link>
        </li>
        {cartSearch.value.length !== 0 ? (
          <li
            className={`pure-menu-item ${
              selectedMenu === "search" ? "pure-menu-selected" : ""
            }`}
          >
            <Link
              href="/exercise-db-preact/search"
              className="pure-menu-link"
              style={{ color: "black" }}
              onClick={() => handleMenuClick("search")}
            >
              Letzte Suchresultate
            </Link>
          </li>
        ) : null}

        <li className="pure-menu-item pure-menu-selected">
          <div class="pure-controls">
            <button
              className="pure-button pure-button-primary"
              type="submit"
              onClick={logout}
            >
              Logout
            </button>
            {/* <form action="/logout?_method=DELETE" method="POST">
              <button type="submit">Log Out</button>
            </form> */}
          </div>
        </li>

        <li
          className={`pure-menu-item ${
            selectedMenu === "warenkorb" ? "pure-menu-selected" : ""
          }`}
          style={{ position: "relative", marginLeft: "auto" }}
        >
          <div id="notification-container"></div>
          <div id="checkmark">✔</div>

          <Link
            href="/exercise-db-preact/warenkorb"
            className="pure-menu-link"
            onClick={() => handleMenuClick("warenkorb")}
          >
            Warenkorb ({getCartCount()})
          </Link>
        </li>

        <li
          className={`pure-menu-item pure-menu-has-children pure-menu-allow-hover ${
            selectedMenu === "contact" ? "pure-menu-selected" : ""
          }`}
          style={{ marginLeft: "auto" }}
        >
          <Link
            href="/exercise-db-preact/"
            id="menuLink1"
            className="pure-menu-link"
            onClick={() => handleMenuClick("contact")}
          >
            Profil/Logout
          </Link>
          <ul className="pure-menu-children">
            <li className="pure-menu-item">
              <Link
                href="/exercise-db-preact/"
                className="pure-menu-link"
                onClick={() => handleMenuClick("contact")}
              >
                Email
              </Link>
            </li>
            <li className="pure-menu-item">
              <Link
                href="/exercise-db-preact/"
                className="pure-menu-link"
                onClick={() => handleMenuClick("contact")}
              >
                Profil
              </Link>
            </li>
            <li className="pure-menu-item">
              <Link
                href="/exercise-db-preact/"
                className="pure-menu-link"
                onClick={() => handleMenuClick("contact")}
              >
                Logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
