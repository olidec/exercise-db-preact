import { Link } from "preact-router/match";
import { useContext, useState } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
import { askServer } from "../utils/connector.js";
export default function Menu() {
  const { cartSearch, getCartSearch } = useContext(SearchContext);

  const logout = async () => {
    const res = await askServer("/logout", "DELETE");
    // window.location.href = "/login";
    console.log(res);
  };

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
          <Link href="./login" className="pure-menu-link">
            Login
          </Link>
        </li>
        <li className="pure-menu-item pure-menu-selected">
          <Link href="./" className="pure-menu-link">
            User
          </Link>
        </li>
        <li className="pure-menu-item pure-menu-selected">
          <Link href="./add" className="pure-menu-link">
            Aufgaben hinzufügen
          </Link>
        </li>
        <li className="pure-menu-item pure-menu-selected">
          <Link href="./find" className="pure-menu-link">
            Aufgaben finden
          </Link>
        </li>
        {cartSearch.value.length !== 0 ? (
          <li className="pure-menu-item pure-menu-selected">
            <Link
              href="./search"
              className="pure-menu-link"
              style={{ color: "purple" }}
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
          className="pure-menu-item pure-menu-selected"
          style={{ marginLeft: "auto" }}
        >
          <Link href="./warenkorb" className="pure-menu-link">
            Warenkorb
          </Link>
        </li>
        <li
          className="pure-menu-item pure-menu-has-children pure-menu-allow-hover"
          style={{ marginLeft: "auto", display: "none" }}
        >
          <Link href="./contact" id="menuLink1" className="pure-menu-link">
            Contact
          </Link>
          <ul className="pure-menu-children">
            <li className="pure-menu-item">
              <Link href="./contact" className="pure-menu-link">
                Email
              </Link>
            </li>
            <li className="pure-menu-item">
              <Link href="./contact" className="pure-menu-link">
                Twitter
              </Link>
            </li>
            <li className="pure-menu-item">
              <Link href="./contact" className="pure-menu-link">
                Tumblr Blog
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
