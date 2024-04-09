import { Link } from "preact-router/match";
import { useContext, useState } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
export default function Menu() {
  const { cartSearch, getCartSearch } = useContext(SearchContext);
  return (
    <div className="pure-menu pure-menu-horizontal">
      <ul
        className="pure-menu-list"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <li className="pure-menu-item pure-menu-selected">
          <Link href="/exercise-db-preact/user" className="pure-menu-link">
            User
          </Link>
        </li>
        <li className="pure-menu-item pure-menu-selected">
          <Link href="/exercise-db-preact/add" className="pure-menu-link">
            Aufgaben hinzufügen
          </Link>
        </li>
        <li className="pure-menu-item pure-menu-selected">
          <Link href="/exercise-db-preact/find" className="pure-menu-link">
            Aufgaben finden
          </Link>
        </li>
        {cartSearch.value.length !== 0 ? (
          <li className="pure-menu-item pure-menu-selected">
            <Link
              href="/exercise-db-preact/search"
              className="pure-menu-link"
              style={{ color: "purple" }}
            >
              Letzte Suchresultate
            </Link>
          </li>
        ) : null}

        <li
          className="pure-menu-item pure-menu-selected"
          style={{ marginLeft: "auto" }}
        >
          <div id="notification-container"></div>
          <div id="checkmark">✔</div>

          <Link href="/exercise-db-preact/warenkorb" className="pure-menu-link">
            Warenkorb
          </Link>
        </li>
        <li
          className="pure-menu-item pure-menu-has-children pure-menu-allow-hover"
          style={{ marginLeft: "auto", display: "none" }}
        >
          <Link
            href="/exercise-db-preact/contact"
            id="menuLink1"
            className="pure-menu-link"
          >
            Contact
          </Link>
          <ul className="pure-menu-children">
            <li className="pure-menu-item">
              <Link
                href="/exercise-db-preact/contact"
                className="pure-menu-link"
              >
                Email
              </Link>
            </li>
            <li className="pure-menu-item">
              <Link
                href="/exercise-db-preact/contact"
                className="pure-menu-link"
              >
                Twitter
              </Link>
            </li>
            <li className="pure-menu-item">
              <Link
                href="/exercise-db-preact/contact"
                className="pure-menu-link"
              >
                Tumblr Blog
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
