import { Link } from "preact-router/match";
import { useContext, useState } from "preact/hooks";

import { SearchContext } from "../signals/exercise.jsx";
import { WarenkorbContext } from "../signals/warenkorb.jsx";
import { useAuth } from "../context/AuthContext";

export default function Menu() {
  const { cartSearch } = useContext(SearchContext);
  const [selectedMenu, setSelectedMenu] = useState("");
  const { getCartCount } = useContext(WarenkorbContext);

  const { logout } = useAuth();

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const loggedIn = localStorage.getItem("user") != null ? true : false;

  return (
    <div className="pure-menu pure-menu-horizontal my-bg-color">
      <ul
        className="pure-menu-list"
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   width: "100%",
        // }}
      >
        <li
          className={`pure-menu-item ${
            selectedMenu === "user" ? "pure-menu-selected" : ""
          }`}
        >
          <Link
            href="/login"
            className="pure-menu-link my-link"
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
            href="/add"
            className="pure-menu-link my-link"
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
            href="/find"
            className="pure-menu-link my-link"
            onClick={() => handleMenuClick("find")}
          >
            Aufgaben finden
          </Link>
        </li>

        <li
          className={`pure-menu-item ${
            selectedMenu === "warenkorb" ? "pure-menu-selected" : ""
          }`}
          // style={{ position: "relative", marginLeft: "auto" }}
        >
          <div id="notification-container"></div>
          <div id="checkmark"></div>

          <Link
            href="/warenkorb"
            className="pure-menu-link my-link"
            onClick={() => handleMenuClick("warenkorb")}
          >
            Warenkorb ({getCartCount()})
          </Link>
        </li>

        <li
          className={`pure-menu-item ${
            selectedMenu === "contact" ? "pure-menu-selected" : ""
          }`}
        >
          {loggedIn && (
            <Link
              href="/"
              className="pure-menu-link logout-link"
              onClick={() => logout()}
            >
              Logout
            </Link>
          )}
          {/* <ul className="pure-menu-children">
            <li className="pure-menu-item">
              <Link
                href="/"
                className="pure-menu-link"
                onClick={() => handleMenuClick("contact")}
              >
                Email
              </Link>
            </li>
            <li className="pure-menu-item">
              <Link
                href="/"
                className="pure-menu-link"
                onClick={() => handleMenuClick("contact")}
              >
                Profil
              </Link>
            </li>
            <li className="pure-menu-item">
              <Link
                href="/"
                className="pure-menu-link"
                onClick={() => logout()}
              >
                Logout
              </Link>
            </li>
          </ul> */}
        </li>
      </ul>
    </div>
  );
}
