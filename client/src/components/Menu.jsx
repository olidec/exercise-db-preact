export default function Menu() {
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
          <a href="./" className="pure-menu-link">
            Home
          </a>
        </li>
        <li className="pure-menu-item pure-menu-selected">
          <a href="./add" className="pure-menu-link">
            Aufgaben hinzufügen
          </a>
        </li>
        <li className="pure-menu-item pure-menu-selected">
          <a href="./find" className="pure-menu-link">
            Aufgaben finden
          </a>
        </li>
        <li className="pure-menu-item pure-menu-selected">
          <a href="./warenkorb" className="pure-menu-link">
            Warenkorb
          </a>
        </li>
        <li
          className="pure-menu-item pure-menu-has-children pure-menu-allow-hover"
          style={{ marginLeft: "auto" }}
        >
          <a href="./contact" id="menuLink1" className="pure-menu-link">
            Contact
          </a>
          <ul className="pure-menu-children">
            <li className="pure-menu-item">
              <a href="./contact" className="pure-menu-link">
                Email
              </a>
            </li>
            <li className="pure-menu-item">
              <a href="./contact" className="pure-menu-link">
                Twitter
              </a>
            </li>
            <li className="pure-menu-item">
              <a href="./contact" className="pure-menu-link">
                Tumblr Blog
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
