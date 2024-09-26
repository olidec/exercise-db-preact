import { useState } from "preact/hooks";
import { askServer } from "../utils/connector.js";
import { useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";

export default function Form() {
  const showNotification = (message, color) => {
    // Finde den Container für die Benachrichtigungen
    const container = document.getElementById("registration-notification");

    // Erstelle das Benachrichtigungselement
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.top = "20px"; // Positioniere die Benachrichtigung am oberen Rand
    notification.style.left = "50%"; // Zentriere die Benachrichtigung horizontal
    notification.style.transform = "translateX(-50%)"; // Stelle sicher, dass sie genau zentriert ist
    notification.style.backgroundColor = color;
    notification.style.color = "white";
    notification.style.padding = "20px"; // Größere Padding-Werte für ein größeres Fenster
    notification.style.minWidth = "300px"; // Stelle eine Mindestbreite ein
    notification.style.textAlign = "center"; // Zentriere den Text innerhalb der Benachrichtigung
    notification.style.borderRadius = "5px";
    notification.style.zIndex = "1000";
    notification.style.fontSize = "18px"; // Vergrößere die Schriftgröße

    // Füge die Benachrichtigung zum Container hinzu
    container.appendChild(notification);

    // Entferne die Benachrichtigung nach 3 Sekunden
    setTimeout(() => {
      if (container.contains(notification)) {
        container.removeChild(notification);
      }
    }, 3500);
  };

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const addNewUser = async (e) => {
    e.preventDefault();
    const res = await askServer("/register", "POST", user);
    if (res.response.err && res.response.err.code === "P2002") {
      showNotification("ERROR: User already exists", "red");
    } else {
      setUser({
        email: "",
        username: "",
        password: "",
      });
      console.log(res);
      showNotification(
        "User added successfully\nRedirecting to Login Page",
        "green"
      );
      setTimeout(() => {
        window.location.assign("/login");
      }, 3500);
    }
  };

  const updateUserHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <h1>Registrieren</h1>
      <div id="registration-notification"></div>
      <form
        className="pure-form pure-form-aligned"
        onSubmit={(e) => addNewUser(e)}
      >
        <fieldset>
          <div class="pure-control-group">
            <label for="aligned-email">Email </label>

            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={updateUserHandler}
              placeholder="E-Mail"
            />
            {/* <span class="pure-form-message-inline">
              This is a required field.
            </span> */}
          </div>

          <div class="pure-control-group">
            <label for="aligned-name">Username </label>
            <input
              type="text"
              name="username"
              id="username"
              value={user.username}
              onChange={updateUserHandler}
              placeholder="Username"
            />
          </div>

          <div class="pure-control-group">
            <label for="aligned-password">Password </label>

            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={updateUserHandler}
              placeholder="Password"
            />
          </div>

          <div class="pure-controls">
            <button className="pure-button pure-button-primary" type="submit">
              Registrieren
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
